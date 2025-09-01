import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import SidebarFilters from '../../components/SidebarFilters'
import OrdersTable from '../../components/OrdersTable'
import Pagination from '../../components/Pagination'
import OrderModal from '../../components/OrderModal'
import { db } from '../../services/firebaseConnection'
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  query,
  
} from 'firebase/firestore'
import { Content, Layout, MainContent } from './styles'
import { toast } from 'react-toastify'
import WebhookTester from '../../components/WebhookTester'

function Trophy() {
  const [status, setStatus] = useState('connecting')
  const [pedidos, setPedidos] = useState([])
  const [filtros, setFiltros] = useState({ status: '', busca: '' })
  const [pagina, setPagina] = useState(1)
  const [itensPorPagina] = useState(5)
  const [modalPedido, setModalPedido] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    let unsubscribe;

    async function setupFirebaseConnection() {
      try {
        setStatus('connecting');
        const pedidosCollection = collection(db, 'pedidos');
        
        // Primeiro busca todos os pedidos
        let q = query(pedidosCollection);
        
        unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            let pedidosData = [];
            querySnapshot.forEach((doc) => {
              pedidosData.push({ id: doc.id, ...doc.data() });
            });
            
            // Ordena os pedidos
            pedidosData.sort((a, b) => {
              // Converte para Date se for um Timestamp do Firestore
              const getDate = (dateObj) => {
                if (!dateObj) return new Date(0);
                if (typeof dateObj.toDate === 'function') return dateObj.toDate();
                if (dateObj instanceof Date) return dateObj;
                return new Date(dateObj);
              };
              
              // Prioriza 'Novo Pedido'
              if (a.status === 'Novo Pedido' && b.status !== 'Novo Pedido') return -1;
              if (a.status !== 'Novo Pedido' && b.status === 'Novo Pedido') return 1;
              
              // Se ambos são 'Novo Pedido' ou nenhum é, ordena por data
              const dateA = getDate(a.createdAt || a.dataCriacao);
              const dateB = getDate(b.createdAt || b.dataCriacao);
              
              // Ordena do mais recente para o mais antigo
              return dateB.getTime() - dateA.getTime();
            });
            
            // Aplica filtro de status se existir
            if (filtros.status) {
              pedidosData = pedidosData.filter(pedido => pedido.status === filtros.status);
            }
            
            setPedidos(pedidosData);
            setStatus('connected');
          },
          (error) => {
            console.error('Erro ao escutar mudanças:', error);
            setStatus('error');
          }
        );
      } catch (error) {
        console.error('Erro ao conectar com Firebase:', error);
        setStatus('error');
      }
    }
    setupFirebaseConnection();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [filtros.status]);

  // Função para atualizar pedido no Firebase
  const updatePedidoInFirebase = async (pedidoId, updates) => {
    try {
      console.log('Atualizando pedido no Firebase:', { pedidoId, updates });
      const pedidoRef = doc(db, 'pedidos', pedidoId);
      
      // Verifica se o documento existe
      const docSnap = await getDoc(pedidoRef);
      if (!docSnap.exists()) {
        console.error('Documento não encontrado:', pedidoId);
        return false;
      }
      
      const updateData = {
        ...updates,
        updatedAt: new Date(),
      };
      
      console.log('Dados que serão atualizados:', updateData);
      
      await updateDoc(pedidoRef, updateData);
      console.log('Pedido atualizado com sucesso no Firebase!');
      return true;
    } catch (error) {
      console.error('Erro ao atualizar pedido no Firebase:', {
        error: error.message,
        code: error.code,
        stack: error.stack
      });
      return false;
    }
  }

  // Filtro de busca (nome, telefone, email) no pai
  const pedidosFiltrados = pedidos.filter(pedido => {
    if (!filtros.busca) return true;
    const buscaLower = filtros.busca.toLowerCase();
    return (
      (pedido.nome && pedido.nome.toLowerCase().includes(buscaLower)) ||
      (pedido.telefone && String(pedido.telefone).includes(filtros.busca)) ||
      (pedido.email && pedido.email.toLowerCase().includes(buscaLower))
    );
  });
  const totalPaginas = Math.ceil(pedidosFiltrados.length / itensPorPagina);
  const pedidosPagina = pedidosFiltrados.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  function handleStatusChange(status) {
    setFiltros((f) => ({ ...f, status }))
    setPagina(1)
  }

  function handleSearchChange(busca) {
    setFiltros((f) => ({ ...f, busca }))
    setPagina(1)
  }

  
  function handleResetFilters() {
    setFiltros({ status: '', busca: '' })
    setPagina(1)
  }

  function handleViewPedido(pedido) {
    setModalPedido(pedido)
    setShowModal(true)
  }

  function handleEditPedido(pedido) {
    setModalPedido(pedido)
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
    setModalPedido(null)
  }

  // Função para disparar o webhook
  const triggerWebhook = async (pedidoData) => {
    const webhookUrl = '/api/webhook';
    const controller = new AbortController();
    let timeoutId = null;
    
    try {
      timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos de timeout
      
      const payload = {
        nome: pedidoData.nome,
        email: pedidoData.email,
        trophyType: pedidoData.trophyType,
        status: pedidoData.status,
        ...(pedidoData.rastreio && { rastreio: pedidoData.rastreio })
      };

      console.log('Enviando webhook para pedido:', {
        pedidoId: pedidoData.id,
        payload: payload
      });

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': pedidoData.id || 'unknown',
          'X-Origin': 'devclub-crm-painel'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      
      const responseData = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        const error = new Error(`Erro ${response.status}: ${response.statusText}`);
        error.response = {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        };
        throw error;
      }
      
      console.log('Webhook disparado com sucesso:', {
        pedidoId: pedidoData.id,
        response: responseData
      });

      return true;
    } catch (error) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      const errorDetails = {
        name: error.name,
        message: error.message,
        pedidoId: pedidoData?.id || 'unknown',
        timestamp: new Date().toISOString(),
        response: error.response || {}
      };

      if (error.name === 'AbortError') {
        errorDetails.details = 'Timeout: A requisição demorou mais de 10 segundos';
        console.error('Timeout ao disparar webhook:', errorDetails);
      } else if (error.response) {
        // Erro de resposta HTTP (4xx, 5xx)
        errorDetails.status = error.response.status;
        errorDetails.statusText = error.response.statusText;
        console.error('Erro na resposta do webhook:', errorDetails);
      } else {
        // Erro de rede ou outro erro
        errorDetails.details = error.stack || 'Erro desconhecido';
        console.error('Falha ao conectar com o webhook:', errorDetails);
      }
      
      return false;
    }
  };

  // Função para atualizar status do pedido
  const handleStatusUpdate = async (newStatus) => {
    if (!modalPedido?.id) return;
    
    const loadingToast = toast.loading('Atualizando status...');
    let isMounted = true;

    try {
      console.log('Atualizando status para:', newStatus);
      
      // Atualiza o estado local primeiro para feedback imediato
      const updatedPedido = { ...modalPedido, status: newStatus };
      setModalPedido(updatedPedido);
      
      // Atualiza o Firebase
      const success = await updatePedidoInFirebase(modalPedido.id, {
        status: newStatus
      });

      if (!isMounted) return;

      if (success) {
        console.log('Status atualizado com sucesso no Firebase');
        
        // Atualiza a lista de pedidos
        setPedidos(prevPedidos => 
          prevPedidos.map(pedido => 
            pedido.id === modalPedido.id 
              ? { ...pedido, status: newStatus, updatedAt: new Date() }
              : pedido
          )
        );
        
        // Atualiza o toast para sucesso
        toast.update(loadingToast, {
          render: `Status atualizado para: ${newStatus}`,
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });
        
        // Dispara o webhook em segundo plano
        triggerWebhook(updatedPedido)
          .then(webhookSuccess => {
            if (webhookSuccess) {
              toast.success('Sistema notificado com sucesso!');
            } else {
              toast.warning('Status atualizado, mas houve um erro ao notificar o sistema.');
            }
          })
          .catch(error => {
            console.error('Erro ao disparar webhook:', error);
            toast.warning('Status atualizado, mas houve um erro ao notificar o sistema.');
          });
      } else {
        throw new Error('Falha ao atualizar o status no banco de dados');
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.update(loadingToast, {
        render: 'Erro ao atualizar status. Tente novamente.',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
      
      // Reverte as alterações locais em caso de erro
      if (isMounted) {
        setModalPedido(modalPedido);
      }
    }
  };

  // Função para atualizar código de rastreio
  const handleRastreioUpdate = async (novoRastreio) => {
    if (!modalPedido || !modalPedido.id) return;

    try {
      console.log('Atualizando rastreio para:', novoRastreio);
      
      // Atualiza o estado local primeiro para feedback imediato
      setModalPedido(prev => ({
        ...prev,
        rastreio: novoRastreio
      }));
      
      // Atualiza o Firebase
      const success = await updatePedidoInFirebase(modalPedido.id, {
        rastreio: novoRastreio,
        updatedAt: new Date()
      });

      if (success) {
        console.log('Rastreio atualizado com sucesso no Firebase');
        
        // Atualiza a lista de pedidos
        setPedidos(prevPedidos => 
          prevPedidos.map(pedido => 
            pedido.id === modalPedido.id 
              ? { ...pedido, rastreio: novoRastreio, updatedAt: new Date() }
              : pedido
          )
        );
        
        toast.success('Código de rastreio atualizado com sucesso!');
        return true;
      } else {
        throw new Error('Falha ao atualizar o código de rastreio no Firebase');
      }
    } catch (error) {
      console.error('Erro ao atualizar rastreio:', error);
      toast.error('Erro ao atualizar código de rastreio. Tente novamente.');
      
      // Reverte as alterações locais em caso de erro
      setModalPedido(prev => ({
        ...prev,
        rastreio: modalPedido.rastreio // Volta para o valor anterior
      }));
      
      setRastreioInput(modalPedido.rastreio || '');
      
      return false;
    }
  }

  return (
    <Layout>
      <Header status={status} page='Troféus Dev Club' />
      <Content>
        <SidebarFilters
          status={filtros.status}
          search={filtros.busca}
          onStatusChange={handleStatusChange}
          onSearchChange={handleSearchChange}

          onReset={handleResetFilters}
        />
        <MainContent>
          <OrdersTable
            pedidos={pedidosPagina}
            onView={handleViewPedido}
            onEdit={handleEditPedido}
          />
          <Pagination
            page={pagina}
            totalPages={totalPaginas}
            onPrev={() => setPagina((p) => Math.max(1, p - 1))}
            onNext={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
          />
        </MainContent>
      </Content>
      <OrderModal
        show={showModal}
        pedido={modalPedido}
        onClose={handleCloseModal}
        onNotify={() => alert('Notificação enviada!')}
        onStatusChange={(status) => {
          setModalPedido((p) => ({ ...p, status }))
          handleStatusUpdate(status)
        }}
        onRastreioChange={(codigoRastreio) => {
          setModalPedido((p) => ({ ...p, rastreio: codigoRastreio }))
          handleRastreioUpdate(codigoRastreio)
        }}
        onStatusUpdate={() => {
          if (modalPedido?.status) {
            handleStatusUpdate(modalPedido.status)
          }
        }}
      />
    
    </Layout>
  )
}

export default Trophy
