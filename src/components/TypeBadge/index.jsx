
import PropTypes from 'prop-types';
import { Badge, statusColors } from './styles';

export default function TypeBadge({ trophyType }) {
  const color = statusColors[trophyType?.toLowerCase()] || '#6c757d';
  return <Badge color={color}>{trophyType}</Badge>;
}

TypeBadge.propTypes = {
  trophyType: PropTypes.string.isRequired,
};
