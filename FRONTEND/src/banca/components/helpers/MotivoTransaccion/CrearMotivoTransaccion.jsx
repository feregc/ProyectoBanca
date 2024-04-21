import Swal from "sweetalert2";
import {
  useAuthStore,
  useForm,
  useMotivoStore,
  useTipoTransaccionStore,
} from "../../../../hooks";

import { Navbar } from "../../Navbar";
import { useEffect } from "react";

const MotivoFormFields = {
  idMotivoTransaccion: "",
  idTipoTransaccion: "",
  codigoMotivoTransaccion: "",
  nombreMotivoTransaccion: "",
  idUsuario: "",
};

export const CrearMotivoTransaccion = () => {
  const { startSavingMotivo } = useMotivoStore();

  const { startLoadingTipoTransaccion, tipoTransaccion: tipoTransaccionData } =
    useTipoTransaccionStore();

  const { user } = useAuthStore();

  const idUser = user.uid;

  const {
    idMotivoTransaccion,
    idTipoTransaccion,
    codigoMotivoTransaccion,
    nombreMotivoTransaccion,
    onInputChange: onMotivoInputChange,
    onResetForm: onMotivoResetForm,
  } = useForm(MotivoFormFields);

  useEffect(() => {
    startLoadingTipoTransaccion();
  }, []);

  const onClienteSubmit = (e) => {
    e.preventDefault();

    if (!idTipoTransaccion || !codigoMotivoTransaccion || !nombreMotivoTransaccion) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    startSavingMotivo({
      idTipoTransaccion: idTipoTransaccion,
      idMotivoTransaccion: idMotivoTransaccion,
      codigoMotivoTransaccion: codigoMotivoTransaccion,
      nombreMotivoTransaccion: nombreMotivoTransaccion,
      idUsuario: idUser,
    });

    Swal.fire(
      "Motivo de transacción creado",
      "El Motivo de transacción ha sido creado con éxito",
      "success"
    );

    startLoadingTipoTransaccion();
    onMotivoResetForm();
  };

  const tipoTransacciones = Array.isArray(tipoTransaccionData.tipoTransaccion)
  ? tipoTransaccionData.tipoTransaccion
  : [];

  return (
    <>
      <Navbar />
      <div>
        <h3 className="text-center">Crear Motivo de Transaccion</h3>
        <form className="container" onSubmit={onClienteSubmit}>
          <div className="row mt-3">
            <div className="col-6">
              <label>Seleccione el Tipo de Transaccion</label>
              <select
                className="form-select mt-3"
                name="idTipoTransaccion"
                value={idTipoTransaccion}
                onChange={onMotivoInputChange}
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
            <div className="col-6">
              <label>Código Motivo de Transacción</label>
              <input
                value={codigoMotivoTransaccion}
                onChange={onMotivoInputChange}
                name="codigoMotivoTransaccion"
                className="form-control mt-3"
                type="text"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <label>Nombre Motivo de Transacción</label>
              <input
                value={nombreMotivoTransaccion}
                onChange={onMotivoInputChange}
                name="nombreMotivoTransaccion"
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
