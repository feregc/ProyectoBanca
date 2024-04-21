import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import "./index.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

export const LoginPage = () => {

  const { startLogin, errorMessage } = useAuthStore();


  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
    // console.log("loginSubmit", { loginEmail, loginPassword });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <>
      <div className="container">
        <div className="row my-5 d-flex justify-content-center ">
          <div className="col-md-6 login-form-1">
            <h3>Ingreso</h3>
            <form onSubmit={loginSubmit}>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Correo"
                  name="loginEmail"
                  value={loginEmail}
                  onChange={onLoginInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="loginPassword"
                  value={loginPassword}
                  onChange={onLoginInputChange}
                />
              </div>
              <div className="d-grid gap-2">
                <input type="submit" className="btnSubmit" value="Login" />
              </div>
            </form>
            <div className="d-flex justify-content-end mt-2">
              <Link to="/seguridad/auth/register">¿No tienes una cuenta?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
