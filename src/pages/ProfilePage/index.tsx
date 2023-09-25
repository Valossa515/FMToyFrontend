import ProfileForm from 'components/ProfileForm';

import { useParams } from 'react-router-dom';


function CadastroPage() {
 const { id } = useParams();
 if (id === undefined) {
  // Lida com a situação em que Id é undefined, por exemplo, redirecione ou mostre uma mensagem de erro
  return <div>Id não encontrado na URL</div>;
}
  return (
    <div>
      <h2>Cadastro de Cliente</h2>
      <ProfileForm id={id} />
    </div>
  );
}

export default CadastroPage;
