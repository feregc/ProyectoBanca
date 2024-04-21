import Swal from "sweetalert2";
import { useAuthStore, useForm, useTipoTransaccionStore,  } from "../../../../hooks";

import { Navbar } from "../../Navbar";

const TipoTransaccionFormFields = {
  idTipoTransaccion: "",
  codigoTipoMovimiento: "",
  codigoTipoTransaccion: "",
  nombreTipoTransaccion: "",
  idUsuario: "",
};

export const CrearTipoTransaccion = () => {
  const { startSavingTipoTransaccion } = useTipoTransaccionStore();
  const { user } = useAuthStore();

  const idUser = user.uid;

  const {
    codigoTipoMovimiento,
    codigoTipoTransaccion,
    nombreTipoTransaccion,
    onInputChange: onTipoTransaccionInputChange,
    onResetForm: onTipoTransaccionResetForm,
  } = useForm(TipoTransaccionFormFields);

  const onClienteSubmit = (e) => {
    e.preventDefault();

    if (!codigoTipoMovimiento || !codigoTipoTransaccion || !nombreTipoTransaccion) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    startSavingTipoTransaccion({
      codigoTipoMovimiento:codigoTipoMovimiento,
      codigoTipoTransaccion:codigoTipoTransaccion,
      nombreTipoTransaccion:nombreTipoTransaccion,
      idUsuario: idUser,
    });

    Swal.fire(
      "Tipo de Transaccion creado",
      "El Tipo de Transaccion ha sido creado con éxito",
      "success"
    );

    onTipoTransaccionResetForm();
  };

  return (
    <>
      <Navbar />
      <div>
        <h3 className="text-center">Crear Tipo de Transaccion</h3>
        <form className="container" onSubmit={onClienteSubmit}>
        <div className="row mt-3">
            <div className="col-6">
              <label>Código del Tipo de Movimiento</label>
              <input
                value={codigoTipoMovimiento}
                onChange={onTipoTransaccionInputChange}
                name="codigoTipoMovimiento"
                className="form-control mt-3"
                type="text"
              />
            </div>
            <div className="col-6">
              <label>Codigo del Tipo de Transaccion</label>
              <input
                value={codigoTipoTransaccion}
                onChange={onTipoTransaccionInputChange}
                name="codigoTipoTransaccion"
                className="form-control mt-3"
                type="text"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <label>Nombre del Tipo de Transaccion</label>
              <input
                value={nombreTipoTransaccion}
                onChange={onTipoTransaccionInputChange}
                name="nombreTipoTransaccion"
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
