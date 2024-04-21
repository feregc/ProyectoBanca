import { useEffect } from "react";
import { useForm, useTipoTransaccionStore } from "../../../../hooks";
import { Navbar } from "../../Navbar";
import Swal from "sweetalert2";

const TipoTransaccionFormFields = {
  idTipoTransaccion: "",
  codigoTipoMovimiento: "",
  codigoTipoTransaccion: "",
  nombreTipoTransaccion: "",
  idUsuario: "",
};
export const EliminarTipoTransaccion = () => {
  const {
    startLoadingTipoTransaccion,
    tipoTransaccion: tipoTransaccionData,
    startDelitingTipoTransaccion,
  } = useTipoTransaccionStore();

  const {
    idTipoTransaccion,
    onInputChange: onTipoTransaccionInputChange,
    onResetForm: onTipoTransaccionResetForm,
  } = useForm(TipoTransaccionFormFields);

  useEffect(() => {
    startLoadingTipoTransaccion();
  }, []);

  const onClienteSubmit = (e) => {
    e.preventDefault();

    startDelitingTipoTransaccion({
      idTipoTransaccion: idTipoTransaccion,
    });

    Swal.fire(
      "Tipo de transaccion eliminado",
      "El Tipo de transaccion ha sido eliminado con éxito",
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
        <h2 className="text-center">Eliminar Tipo de Cliente</h2>
        <form className="container" onSubmit={onClienteSubmit}>
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
          <button className="btn btn-danger mt-3" type="submit">
            Eliminar
          </button>
        </form>
      </div>
    </>
  );
};
