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
  updateDoc,
  onSnapshot,
  query,
  where,
  
} from 'firebase/firestore'
import { Content, Layout, MainContent } from './styles'
import { toast } from 'react-toastify'

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
        let q = pedidosCollection;
        // Filtro por status no Firestore
        if (filtros.status) {
          q = query(pedidosCollection, where('status', '==', filtros.status));
        } else {
          q = query(pedidosCollection);
        }
        unsubscribe = onSnapshot(
          q,
          (querySnapshot) => {
            let pedidosData = [];
            querySnapshot.forEach((doc) => {
              pedidosData.push({ id: doc.id, ...doc.data() });
            });
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
      const pedidoRef = doc(db, 'pedidos', pedidoId)
      await updateDoc(pedidoRef, {
        ...updates,
        updatedAt: new Date(),
      })
      console.log('Pedido atualizado com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error)
      return false
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
    // Usando o proxy do Vite configurado em vite.config.js
    const webhookUrl = '/api/webhook';
    
    const payload = {
      nome: pedidoData.nome,
      email: pedidoData.email,
      trophyType: pedidoData.trophyType,
      status: pedidoData.status,
      ...(pedidoData.rastreio && { rastreio: pedidoData.rastreio })
    };

    try {
      console.log('Enviando webhook com payload:', payload);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro na resposta do webhook:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Erro ao enviar webhook: ${response.status}`);
      }

      const responseData = await response.json().catch(() => ({}));
      console.log('Webhook disparado com sucesso!', responseData);
      return true;
    } catch (error) {
      console.error('Erro ao disparar webhook:', {
        error: error.message,
        stack: error.stack,
        payload
      });
      return false;
    }
  };

  // Função para atualizar status do pedido
  const handleStatusUpdate = async (newStatus) => {
    if (!modalPedido || !modalPedido.id) return;

    try {
      // Atualiza o status no Firebase
      const success = await updatePedidoInFirebase(modalPedido.id, {
        status: newStatus,
      });

      if (success) {
        const updatedPedido = { ...modalPedido, status: newStatus };
        setModalPedido(updatedPedido);
        toast.success(`Status atualizado para: ${newStatus}`);
        
        // Dispara o webhook em segundo plano
        triggerWebhook(updatedPedido).catch(error => {
          console.error('Erro ao disparar webhook:', error);
          toast.error('Status atualizado, mas houve um erro ao notificar o sistema.');
        });
      } else {
        throw new Error('Falha ao atualizar o status no banco de dados');
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status. Tente novamente.');
    }
  };

  // Função para atualizar código de rastreio
  const handleRastreioUpdate = async (novoRastreio) => {
    if (!modalPedido || !modalPedido.id) return;

    try {
      const success = await updatePedidoInFirebase(modalPedido.id, {
        rastreio: novoRastreio,
      });

      if (success) {
        setModalPedido((prev) => ({
          ...prev,
          rastreio: novoRastreio,
        }));
        toast.success('Código de rastreio atualizado com sucesso!');
      } else {
        throw new Error('Falha ao atualizar o código de rastreio');
      }
    } catch (error) {
      console.error('Erro ao atualizar rastreio:', error);
      toast.error('Erro ao atualizar código de rastreio. Tente novamente.');
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
          setModalPedido((p) => ({ ...p, codigoRastreio }))
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
