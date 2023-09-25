import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { register } from "services/authservice";

const SignupForm: React.FC = () => {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (password === confirmPassword) {
        setLoading(true);
        await register( username, email, password );
        setLoading(false);
        history("/"); // Redirecionar para a página de login após o registro
      } else {
        setPasswordsMatch(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Erro ao criar conta!', {
        position: toast.POSITION.TOP_CENTER,
      });
      // Trate o erro de alguma forma apropriada, como exibir uma mensagem de erro
    }
  };

  // Função para verificar a correspondência das senhas e atualizar o estado passwordsMatch
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordsMatch(value === password);
  };

  return (
    <div className="Auth-form-container">
      <ToastContainer />
      <form className="Auth-form" onSubmit={handleSignup}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={() => history("/")}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {!passwordsMatch && (
            <p className="text-danger mt-2">Passwords do not match</p>
          )}
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!passwordsMatch || loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
