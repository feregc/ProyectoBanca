import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import "./index.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const registerFormFields = {
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const RegisterPage = () => {
  const { startRegister, errorMessage } = useAuthStore();
  const {
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const [isAdmin, setIsAdmin] = useState(false);

  const validateIsAdmin = (value) => {
    return value === true || value === false;
  };

  const registerSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerPassword2) {
      Swal.fire("Error en registro", "Contraseñas no son iguales", "error");
      return;
    }
    if (!validateIsAdmin(isAdmin)) {
      Swal.fire("Error en registro", "Por favor selecciona si eres administrador", "error");
      return;
    }
    console.log({ registerEmail, registerPassword, isAdmin });
    startRegister({ email: registerEmail, password: registerPassword, isAdmin: isAdmin });
    Swal.fire("Registro exitoso", "Usuario creado correctamente", "success");
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <>
      <div className="container my-5">
        <div className="row my-5 d-flex justify-content-center ">
          <div className="col-md-6 login-form-2 ">
            <h3>Registro</h3>
            <form onSubmit={registerSubmit}>
              <div className="form-group mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  name="registerEmail"
                  value={registerEmail}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="registerPassword"
                  value={registerPassword}
                  onChange={onRegisterInputChange}
                />
              </div>

              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repita la contraseña"
                  name="registerPassword2"
                  value={registerPassword2}
                  onChange={onRegisterInputChange}
                />
              </div>

              <div className="form-check my-2 py-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isAdminCheckbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label className="form-check-label text-white" htmlFor="isAdminCheckbox">
                  Soy administrador
                </label>
              </div>

              <div className="d-grid gap-2">
                <input
                  type="submit"
                  className=" btnSubmit"
                  value="Crear cuenta"
                />
              </div>
            </form>
            <div className="d-flex justify-content-end mt-2">
              <Link className="text-white" to="/seguridad/auth/">
                ¿Ya tienes una cuenta?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


// <div className="form-check my-2 py-1">
// <input
//   className="form-check-input"
//   type="checkbox"
//   id="flexCheckDefault"
//   name="isAdmin"
//   value={isAdmin}
//   onChange={onRegisterInputChange}
// />
// <label className="form-check-label text-white" htmlFor="flexCheckDefault">
//   ¿Eres Administrador?
// </label>
// </div>