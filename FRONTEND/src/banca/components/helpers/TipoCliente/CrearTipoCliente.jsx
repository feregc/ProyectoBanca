import Swal from "sweetalert2";
import { useAuthStore, useForm, useTipoClienteStore } from "../../../../hooks";

import { Navbar } from "../../Navbar";

const TipoClienteFormFields = {
  codigoTipoCliente: "",
  nombreTipoCliente: "",
  idUsuario: "",
};

export const CrearTipoCliente = () => {
  const { startSavingTipoCliente } = useTipoClienteStore();
  const { user } = useAuthStore();

  const idUser = user.uid;

  const {
    codigoTipoCliente,
    nombreTipoCliente,
    onInputChange: onTipoClienteInputChange,
    onResetForm: onTipoClienteResetForm,
  } = useForm(TipoClienteFormFields);

  const onClienteSubmit = (e) => {
    e.preventDefault();

    if (!codigoTipoCliente || !nombreTipoCliente) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    startSavingTipoCliente({
      codigoTipoCliente: codigoTipoCliente,
      nombreTipoCliente: nombreTipoCliente,
      idUsuario: idUser,
    });

    Swal.fire(
      "Tipo de cliente creado",
      "El Tipo de cliente ha sido creado con éxito",
      "success"
    );

    onTipoClienteResetForm();
  };

  return (
    <>
      <Navbar />
      <div>
        <h3 className="text-center">Crear Tipo Cliente</h3>
        <form className="container" onSubmit={onClienteSubmit}>
          <div className="row mt-3">
            <div className="col-6">
              <label>Código del Tipo de Cliente</label>
              <input
                value={codigoTipoCliente}
                onChange={onTipoClienteInputChange}
                name="codigoTipoCliente"
                className="form-control mt-3"
                type="text"
              />
            </div>
            <div className="col-6">
              <label>Nombre del Tipo de Cliente</label>
              <input
                value={nombreTipoCliente}
                onChange={onTipoClienteInputChange}
                name="nombreTipoCliente"
                className="form-control mt-3"
                type="text"
              />
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
