// SignupForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authservice from "services/authservice";

const SignupForm: React.FC = () => {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await authservice.register(username, email, password);
      setLoading(false);
      history("/login"); // Redirecionar para a página de login após o registro
    } catch (error) {
      setLoading(false);
      console.error("Erro durante o registro:", error);
      // Trate o erro de alguma forma apropriada, como exibir uma mensagem de erro
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="username">Nome de usuário</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Aguarde..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
