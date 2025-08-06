import PropTypes from "prop-types";
import {
  CloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "./styles";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function OrderModal({
  show,
  pedido,
  onClose,
  onNotify,
  onStatusChange,
  onRastreioChange,
  onStatusUpdate,
}) {
  const [rastreioInput, setRastreioInput] = useState(pedido?.rastreio || "");

  const handleCopyOrderInfo = () => {
    const formattedDate = pedido.date?.toDate 
      ? new Date(pedido.date.toDate()).toLocaleString('pt-BR') 
      : 'Data não disponível';

    const orderInfo = `Informações do Aluno
` +
      `Tipo de Troféu: ${pedido.trophyType || 'Não informado'}
` +
      `Nome: ${pedido.nome || 'Não informado'}

` +
      `Email: ${pedido.email || 'Não informado'}

` +
      `Telefone: ${pedido.telefone || 'Não informado'}

` +
      `CPF: ${pedido.cpf || 'Não informado'}

` +
      `Data do Pedido: ${formattedDate}

` +
      `Endereço de Entrega
` +
      `rua: ${pedido.endereco || 'Não informado'} ${pedido.complemento ? ` ${pedido.complemento}` : ''}\n\n` +
      `Cidade: ${pedido.cidade || 'Não informada'}\n\n` +
      `Estado: ${pedido.estado || 'Não informado'}\n\n` +
      `CEP: ${pedido.cep || 'Não informado'}`;

    navigator.clipboard.writeText(orderInfo)
      .then(() => {
        toast.success('Informações copiadas para a área de transferência!');
      })
      .catch((err) => {
        console.error('Erro ao copiar: ', err);
        toast.error('Erro ao copiar as informações');
      });
  };

  useEffect(() => {
    setRastreioInput(pedido?.rastreio || "");
  }, [pedido?.rastreio]);

  if (!pedido) return null;

  return (
    <ModalOverlay $show={show} onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Detalhes do Pedido <span>{pedido.nome}</span></ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Informações do Aluno</h2>
            <button 
              onClick={handleCopyOrderInfo}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copiar Dados
            </button>
          </div>
          <h3 className="type">Tipo de Troféu: {pedido.trophyType}</h3>
          <p>
            <strong>Nome:</strong> {pedido.nome}
          </p>
          <p>
            <strong>Email:</strong> {pedido.email}
          </p>
          <p>
            <strong>Telefone:</strong> {pedido.telefone}
          </p>
          <p>
            <strong>CPF:</strong> {pedido.cpf}
          </p>
          <p><strong>Data do Pedido:</strong> {pedido.date?.toDate ? new Date(pedido.date.toDate()).toLocaleString('pt-BR') : 'Data não disponível'}</p>
          <h3 className="type">Endereço de Entrega</h3>
          <p>{pedido.endereco}  {pedido.complemento}</p>
          <p><strong>Cidade:</strong> {pedido.cidade}</p>
          <p><strong>Estado:</strong> {pedido.estado}</p>
          <p>
            <strong>CEP:</strong> {pedido.cep}
          </p>
          <h3 className="type">Status do Pedido</h3>
          <select
            value={pedido.status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="Novo Pedido">Novo Pedido</option>
            <option value="Na Fila para Produção">Na Fila para Produção</option>
            <option value="Em Produção">Em Produção</option>
            <option value="Etiqueta Gerada">Etiqueta Gerada</option>
            <option value="Enviado">Enviado</option>
            <option value="Entregue">Entregue</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          <button
            className="btn"
            onClick={onStatusUpdate}
            style={{ marginLeft: "1rem" }}
          >
            Atualizar
          </button>
          <div style={{ marginTop: "1rem" }}>
            <label>Código de Rastreio:</label>
            <input
              type="text"
              value={rastreioInput}
              onChange={e => setRastreioInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  onRastreioChange(rastreioInput);
                }
              }}
            />
          </div>
          <h3 className="type">Bônus Escolhido</h3>
          <p>{pedido.bonus}</p>
          
        </div>
        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Fechar
          </button>
          <button className="btn btn-primary" onClick={onNotify}>
            Enviar Notificação
          </button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}

OrderModal.propTypes = {
  show: PropTypes.bool.isRequired,
  pedido: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    trophyType: PropTypes.string,
    nome: PropTypes.string,
    email: PropTypes.string,
    telefone: PropTypes.string,
    cpf: PropTypes.string,
    endereco: PropTypes.string,
    complemento: PropTypes.string,
    cep: PropTypes.string,
    status: PropTypes.string,
    rastreio: PropTypes.string,
    bonus: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onNotify: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onRastreioChange: PropTypes.func.isRequired,
  onStatusUpdate: PropTypes.func.isRequired,
};
