
import PropTypes from 'prop-types';
import { FilterSection, Sidebar } from './styles';

export default function SidebarFilters({ status, search, onStatusChange, onSearchChange, onReset }) {
  return (
    <Sidebar>
      <FilterSection>
        <h3>Filtros</h3>
        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <select id="status-filter" value={status} onChange={e => onStatusChange(e.target.value)}>
            <option value="">Todos</option>
            <option value="Novo Pedido">Novo Pedido</option>
            <option value="Na Fila para Produção">Na Fila para Produção</option>
            <option value="Em Produção">Em Produção</option>
            <option value="Etiqueta Gerada">Etiqueta Gerada</option>
            <option value="Enviado">Enviado</option>
            <option value="Entregue">Entregue</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="search">Buscar:</label>
          <input id="search" type="text" placeholder="Nome, email ou telefone" value={search} onChange={e => onSearchChange(e.target.value)} />
        </div>

        <button className="btn-secondary" onClick={onReset}>
          Limpar Filtros
        </button>
      </FilterSection>
    </Sidebar>
  );
}

SidebarFilters.propTypes = {
  status: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
