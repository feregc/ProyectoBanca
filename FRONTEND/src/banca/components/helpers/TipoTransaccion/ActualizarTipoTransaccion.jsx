import Swal from "sweetalert2";
import {
  useAuthStore,
  useForm,
  useTipoTransaccionStore,
} from "../../../../hooks";

import { Navbar } from "../../Navbar";
import { useEffect } from "react";

const TipoTransaccionFormFields = {
  idTipoTransaccion: "",
  codigoTipoMovimiento: "",
  codigoTipoTransaccion: "",
  nombreTipoTransaccion: "",
  idUsuario: "",
};

export const ActualizarTipoTransaccion = () => {
  const {
    startLoadingTipoTransaccion,
    startUpdatingTipoTransaccion,
    tipoTransaccion: tipoTransaccionData,
  } = useTipoTransaccionStore();
  const { user } = useAuthStore();

  const idUser = user.uid;

  const {
    idTipoTransaccion,
    codigoTipoMovimiento,
    codigoTipoTransaccion,
    nombreTipoTransaccion,
    onInputChange: onTipoTransaccionInputChange,
    onResetForm: onTipoTransaccionResetForm,
  } = useForm(TipoTransaccionFormFields);

  useEffect(() => {
    startLoadingTipoTransaccion();
  }, []);

  const onTipoTransaccionSubmit = (e) => {
    e.preventDefault();

    startUpdatingTipoTransaccion({
      idTipoTransaccion: idTipoTransaccion,
      codigoTipoMovimiento: codigoTipoMovimiento,
      codigoTipoTransaccion: codigoTipoTransaccion,
      nombreTipoTransaccion: nombreTipoTransaccion,
      idUsuario: idUser,
    });

    Swal.fire(
      "Tipo de transaccion actualizado",
      "El Tipo de transaccion ha sido actualizado con éxito",
      "success"
    );

    startLoadingTipoTransaccion();
    onTipoTransaccionResetForm();
  };

  const tipoTransacciones = Array.isArray(tipoTransaccionData.tipoTransaccion)
    ? tipoTransaccionData.tipoTransaccion
    : [];

  return (
    <>
      <Navbar />
      <div>
        <h3 className="text-center">Actualizar Tipo de Transaccion</h3>
        <form className="container" onSubmit={onTipoTransaccionSubmit}>
          <div className="row mt-5 mb-5 d-flex justify-content-center">
            <div className="col-6">
              <label>Seleccione el Tipo de Transaccion</label>
              <select
                className="form-select mt-3"
                name="idTipoTransaccion"
                value={idTipoTransaccion}
                onChange={onTipoTransaccionInputChange}
              >
                <option value="">Seleccione el Tipo de Transaccion</option>
                {tipoTransacciones.map((tipoTransaccion) => (
                  <option
                    key={tipoTransaccion.idTipoTransaccion}
                    value={tipoTransaccion.idTipoTransaccion}
                  >
                    {tipoTransaccion.nombreTipoTransaccion}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
            Actualizar
          </button>
        </form>
      </div>
    </>
  );
};
