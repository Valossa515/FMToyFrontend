// CadastroPage.tsx
import CadastroClienteForm from 'components/ProfileForm';
import { ClienteDTO } from 'models/cliente';
import React from 'react';
 // Certifique-se de fornecer o caminho correto

const CadastroPage: React.FC = () => {
  const handleSubmit = (clienteData: ClienteDTO) => {
    // Aqui você pode enviar os dados do cliente para o servidor ou realizar outras ações
    console.log('Dados do cliente a serem enviados:', clienteData);
    // Após o envio bem-sucedido, você pode redirecionar o usuário para outra página
    // history('/categorias');
  };

  return (
    <div>
      <h2>Cadastro de Cliente</h2>
      <CadastroClienteForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CadastroPage;
