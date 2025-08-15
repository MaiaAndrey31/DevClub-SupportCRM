import { useState } from 'react';
import { addBonus } from '../../services/bonusService';
import { toast } from 'react-toastify';
import { FormContainer, FormGroup, Input, Select, SubmitButton } from './styles';

const BonusForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    bonus: '+ 6 meses',
    atendente: '',
    status: 'Pendente'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await addBonus(formData);
      if (result.success) {
        toast.success('Bônus cadastrado com sucesso!');
        setFormData({
          nome: '',
          telefone: '',
          email: '',
          bonus: '+ 6 meses',
          atendente: '',
          status: 'Pendente'
        });
      } else {
        throw new Error('Falha ao cadastrar bônus');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao cadastrar bônus. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormGroup>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <Input
            type="text"
            name="nome"
            placeholder="Nome do cliente"
            value={formData.nome}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </FormGroup>

        <FormGroup>
          <label className="block text-sm font-medium text-gray-700">Telefone</label>
          <Input
            type="tel"
            name="telefone"
            placeholder="Telefone do cliente"
            value={formData.telefone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </FormGroup>

        <FormGroup>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <Input
            type="email"
            name="email"
            placeholder="E-mail do cliente"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </FormGroup>

        <FormGroup>
          <label className="block text-sm font-medium text-gray-700">Bônus</label>
          <Select
            name="bonus"
            value={formData.bonus}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="+ 6 meses">+ 6 meses</option>
            
          </Select>
        </FormGroup>

        <FormGroup>
          <label className="block text-sm font-medium text-gray-700">Atendente</label>
          <Input
            type="text"
            name="atendente"
            placeholder="Nome do atendente"
            value={formData.atendente}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </FormGroup>

        <FormGroup className="pt-4">
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : 'Cadastrar Bônus'}
          </SubmitButton>
        </FormGroup>
      </form>
    </FormContainer>
  );
};

export default BonusForm;
