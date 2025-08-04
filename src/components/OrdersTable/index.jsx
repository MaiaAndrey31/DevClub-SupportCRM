import StatusBadge from '../StatusBadge';
import { TableContainer, Table } from './styles';
import PropTypes from 'prop-types';
import { PencilIcon, EyeIcon } from '@phosphor-icons/react';

export default function OrdersTable({ pedidos, onView, onEdit }) {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr >
            
            <th style={{ textAlign: 'center', fontSize: '12px' }}>Nome</th>
            <th style={{ textAlign: 'center', fontSize: '12px' }}>Telefone</th>
            <th style={{ textAlign: 'center', fontSize: '12px' }}>Tipo de Troféu</th>
            <th style={{ textAlign: 'center', fontSize: '12px' }}>Status</th>
            <th style={{ textAlign: 'center', fontSize: '12px' }}>Data</th>
            <th style={{ textAlign: 'center', fontSize: '12px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length === 0 ? (
            <tr>
              <td colSpan={7} className="loading">Carregando pedidos...</td>
            </tr>
          ) : (
            pedidos.map(pedido => (
              <tr key={pedido.id}>
                
                <td style={{ textAlign: 'center', fontSize: '12px' }}>{pedido.nome}</td>
                <td style={{ textAlign: 'center', fontSize: '12px' }}>{pedido.telefone}</td>
                <td style={{ textAlign: 'center', fontSize: '12px' }}>{pedido.trophyType || 'Não informado'}</td>
                <td style={{ textAlign: 'center', fontSize: '12px' }}><StatusBadge status={pedido.status} /></td>
                <td style={{ textAlign: 'center', fontSize: '12px' }}>{pedido.date && typeof pedido.date.toDate === 'function'
  ? pedido.date.toDate().toLocaleString()
  : pedido.date
}</td>
                <td>
                  <button className="btn btn-icon" title="Visualizar" onClick={() => onView(pedido)}>
                  <EyeIcon size={26} weight="bold"/>
                  </button>
                  <button className="btn btn-icon" title="Editar" onClick={() => onEdit(pedido)}>
                  <PencilIcon size={26} weight="bold" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}

OrdersTable.propTypes = {
  pedidos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onView: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
