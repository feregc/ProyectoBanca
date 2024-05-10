import { useEffect } from "react";
import { useForm, useUsuarioStore } from "../../../../hooks";
import { Navbar } from "../../Navbar";
import Swal from "sweetalert2";

const UsuarioFormFields = {
  idUsuario: "",
};

export const EliminarUsuario = () => {
  const {
    startLoadingUsuarios,
    startDelitingUsuario,
    usuario: usuarioData,
  } = useUsuarioStore();

  const {
    idUsuario,
    onInputChange: onUsuarioInputChange,
    onResetForm: onUsuarioResetForm,
  } = useForm(UsuarioFormFields);

  useEffect(() => {
    startLoadingUsuarios();
  }, []);

  const onUsuarioSubmit = (e) => {
    e.preventDefault();

    startDelitingUsuario({
      idUsuario: idUsuario,
    });

    Swal.fire(
      "Usuario eliminado",
      "El Usuario ha sido eliminado con éxito",
      "success"
    );

    startLoadingUsuarios();
    onUsuarioResetForm();

    startLoadingUsuarios();
  };

  const usuarios =
    usuarioData.usuario && Array.isArray(usuarioData.usuario.usuarios)
      ? usuarioData.usuario.usuarios
      : [];

  return (
    <>
      <Navbar />
      <div>
        <h2 className="text-center">Eliminar Usuario</h2>
        <form className="container" onSubmit={onUsuarioSubmit}>
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
          <button className="btn btn-danger mt-3" type="submit">
            Eliminar
          </button>
        </form>
      </div>
    </>
  );
};
