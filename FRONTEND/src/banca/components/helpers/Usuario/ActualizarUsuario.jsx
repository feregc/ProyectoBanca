import Swal from "sweetalert2";
import { useForm, useUsuarioStore } from "../../../../hooks";

import { Navbar } from "../../Navbar";
import { useEffect } from "react";

const UsuarioFormFields = {
  idUsuario: "",
  codigoUsuario: "",
  nombreUsuario: "",
  passwordUsuario: "",
  passwordUsuario2: "",
  isActivo: "",
};

export const ActualizarUsuario = () => {
  const {
    startLoadingUsuarios,
    startUpdatingUsuarios,
    usuario: usuarioData,
  } = useUsuarioStore();

  const {
    idUsuario,
    codigoUsuario,
    nombreUsuario,
    passwordUsuario,
    passwordUsuario2,
    isActivo,
    onInputChange: onUsuarioInputChange,
    onResetForm: onTipoClienteResetForm,
  } = useForm(UsuarioFormFields);

  useEffect(() => {
    startLoadingUsuarios();
  }, []);

  const onClienteSubmit = (e) => {
    e.preventDefault();

    console.log({
      idUsuario: idUsuario,
      codigoUsuario: codigoUsuario,
      nombreUsuario: nombreUsuario,
      passwordUsuario: passwordUsuario,
      isActivo: isActivo,
    });

    if (passwordUsuario !== passwordUsuario2) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    startUpdatingUsuarios({
      idUsuario: idUsuario,
      codigoUsuario: codigoUsuario,
      nombreUsuario: nombreUsuario,
      passwordUsuario: passwordUsuario,
      isActivo: isActivo,
    });

    Swal.fire(
      "Usuario actualizado",
      "El Usuario ha sido actualizado con éxito",
      "success"
    );
    startLoadingUsuarios();
    onTipoClienteResetForm();
    startLoadingUsuarios();
  };

  // console.log(usuarioData.usuario.usuarios);

  const usuarios =
    usuarioData.usuario && Array.isArray(usuarioData.usuario.usuarios)
      ? usuarioData.usuario.usuarios
      : [];

  return (
    <>
      <Navbar />
      <div>
        <h3 className="text-center">Actualizar Usuario</h3>
        <form className="container" onSubmit={onClienteSubmit}>
          <div className="row mt-5 mb-5 d-flex justify-content-center">
            <div className="col-6 ">
              <label>Seleccionar Usuario:</label>
              <select
                className="form-select mt-3"
                name="idUsuario"
                value={idUsuario}
                onChange={onUsuarioInputChange}
              >
                <option value="">Seleccione Usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.idUsuario} value={usuario.idUsuario}>
                    {usuario.nombreUsuario}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-6">
              <label>Código de Usuario</label>
              <select
                value={codigoUsuario}
                onChange={onUsuarioInputChange}
                name="codigoUsuario"
                className="form-select mt-3"
              >
                <option value="">Seleccione el código de usuario</option>
                <option value={true}>Administrador</option>
                <option value={false}>Usuario</option>
              </select>
            </div>
            <div className="col-6">
              <label>Nombre de Usuario</label>
              <input
                value={nombreUsuario}
                onChange={onUsuarioInputChange}
                name="nombreUsuario"
                className="form-control mt-3"
                type="text"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <label>Contraseña de Usuario</label>
              <input
                value={passwordUsuario}
                onChange={onUsuarioInputChange}
                name="passwordUsuario"
                className="form-control mt-3"
                type="password"
              />
            </div>
            <div className="col-6">
              <label>Repita Contraseña</label>
              <input
                value={passwordUsuario2}
                onChange={onUsuarioInputChange}
                name="passwordUsuario2"
                className="form-control mt-3"
                type="password"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <label>Activo</label>
              <select
                value={isActivo}
                onChange={onUsuarioInputChange}
                name="isActivo"
                className="form-select mt-3"
              >
                <option value="">Seleccione el estado de usuario</option>
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary mt-3" type="submit">
            Crear
          </button>
        </form>
      </div>
    </>
  );
};
