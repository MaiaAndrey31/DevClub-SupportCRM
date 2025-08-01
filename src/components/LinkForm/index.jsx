import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, FloppyDisk } from '@phosphor-icons/react';
import { createLink, updateLink } from '../../api/api';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
  IconButton
} from './styles';

const ICON_OPTIONS = [
  { value: 'CoinVertical', label: 'Moeda' },
  { value: 'Headset', label: 'Fone' },
  { value: 'UsersFour', label: 'Usuários' },
  { value: 'Student', label: 'Estudante' },
  { value: 'Trophy', label: 'Troféu' },
  { value: 'Link', label: 'Link' },
  { value: 'Gear', label: 'Engrenagem' },
  { value: 'ListChecks', label: 'Lista' }
];

export const LinkForm = ({ link, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    icon: 'Link'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (link) {
      setFormData({
        title: link.title || '',
        url: link.url || '',
        description: link.description || '',
        icon: link.icon || 'Link'
      });
    }
  }, [link]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (link && link.id) {
        await updateLink(link.id, formData);
      } else {
        await createLink(formData);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError('Erro ao salvar o link. Tente novamente.');
      console.error('Erro ao salvar link:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h3>{link ? 'Editar Link' : 'Adicionar Novo Link'}</h3>
          <IconButton onClick={onClose}>
            <X size={20} />
          </IconButton>
        </ModalHeader>
        
        <ModalBody>
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label>Título*</label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Ex: Plataforma de Aulas"
              />
            </FormGroup>

            <FormGroup>
              <label>URL*</label>
              <Input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
                placeholder="https://exemplo.com"
              />
            </FormGroup>

            <FormGroup>
              <label>Descrição</label>
              <Input
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Descrição do link"
              />
            </FormGroup>

            <FormGroup>
              <label>Ícone</label>
              <select 
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="icon-select"
              >
                {ICON_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </FormGroup>

            <ButtonGroup>
              <SecondaryButton type="button" onClick={onClose}>
                Cancelar
              </SecondaryButton>
              <PrimaryButton type="submit" disabled={isSubmitting}>
                <FloppyDisk size={18} />
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </PrimaryButton>
            </ButtonGroup>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

LinkForm.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default LinkForm;
