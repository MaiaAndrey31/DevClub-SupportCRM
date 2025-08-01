
import PropTypes from 'prop-types';
import { Badge, statusColors } from './styles';

export default function StatusBadge({ status }) {
  const color = statusColors[status?.toLowerCase()] || '#6c757d';
  return <Badge color={color}>{status}</Badge>;
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};
