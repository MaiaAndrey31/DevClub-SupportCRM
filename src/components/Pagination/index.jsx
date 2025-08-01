

import PropTypes from 'prop-types';
import { Button, PaginationWrapper } from './styles';

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <PaginationWrapper>
      <Button onClick={onPrev} disabled={page <= 1}>&lt;</Button>
      <span>Página {page} de {totalPages}</span>
      <Button onClick={onNext} disabled={page >= totalPages}>&gt;</Button>
    </PaginationWrapper>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};
