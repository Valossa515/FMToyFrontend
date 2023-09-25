import React, { useState } from 'react';
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { login } from 'services/authservice';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
interface Props {

}


const Login: React.FC<Props> = () => {
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = async (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;
  
    setMessage("");
    setLoading(true);
  
    try {
      const loginResponse = await login(username, password);
  
      if (loginResponse) {
        navigate("/categorias");
        window.location.reload();
      } else {
        // Handle the case where login was not successful
        setLoading(false);
        setMessage("Login unsuccessful. Please check your credentials.");
      }
    } catch (error) {
      // Handle other errors (e.g., network errors)
      setLoading(false);
      setMessage("An error occurred during login. Please try again later.");
    }
  };
  

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>
  
            <div className="form-group d-flex justify-content-center d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
  
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <p className="forgot-password text-right mt-2">
              Forgot <Link className="nav-link" to={"/auth/forgot"}>Password?</Link>
            </p>
            <Link to="/auth/signup">Não tem uma conta? Crie uma aqui.</Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
  
  
};

export default Login;