import PropTypes from "prop-types";
import {
  CloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "./styles";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    setRastreioInput(pedido?.rastreio || "");
  }, [pedido?.rastreio]);

  if (!pedido) return null;
  console.log(pedido);

  return (
    <ModalOverlay $show={show} onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Detalhes do Pedido {pedido.nome}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <div>
          <h2>Informações do Aluno</h2>
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
          <h3 className="type">Endereço de Entrega</h3>
          <p>{pedido.endereco}  {pedido.complemento}</p>
          <p>
            <strong>CEP:</strong> {pedido.cep}
          </p>
          <h3 className="type">Status do Pedido</h3>
          <select
            value={pedido.status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="Novo Pedido">Novo Pedido</option>
            <option value="Em Produção">Em Produção</option>
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
          <h3 className="type">Histórico de Atualizações</h3>
          <ul>
            {(pedido.historicoAtualizacoes || []).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
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
    historicoAtualizacoes: PropTypes.arrayOf(PropTypes.string),
  }),
  onClose: PropTypes.func.isRequired,
  onNotify: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onRastreioChange: PropTypes.func.isRequired,
  onStatusUpdate: PropTypes.func.isRequired,
};
