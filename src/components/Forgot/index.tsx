import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendNewPassword } from 'services/authservice';

interface Props {

}

const ForgotForm: React.FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendNewPassword(email);
      setSent(true);
      alert('Um email foi enviado com sua nova senha.');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao tentar recuperar a senha.');
    }
  };
  
  const redirectToHome = () => {
    navigate('/');
  };

  if(sent){
    redirectToHome();
  }

  return (
    <form className="container mt-5" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Recuperar Senha
      </button>
    </form>
  );
  
};


export default ForgotForm;