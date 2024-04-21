import Swal from "sweetalert2";
import { useAuthStore, useForm, useMotivoStore } from "../../../../hooks";

import { Navbar } from "../../Navbar";
import { useEffect } from "react";

const MotivoFormFields = {
  idMotivoTransaccion: "",
  codigoMotivoTransaccion: "",
  nombreMotivoTransaccion: "",
  idUsuario: "",
};

export const ActualizarMotivoTransaccion = () => {
  const {
    startLoadingMotivos,
    startUpdatingMotivo,
    motivos: motivoData,
  } = useMotivoStore();
  const { user } = useAuthStore();

  const idUser = user.uid;

  const {
    idMotivoTransaccion,
    codigoMotivoTransaccion,
    nombreMotivoTransaccion,
    onInputChange: onMotivoInputChange,
    onResetForm: onMotivoResetForm,
  } = useForm(MotivoFormFields);

  useEffect(() => {
    startLoadingMotivos();
  }, []);

  const onMotivoSubmit = (e) => {
    e.preventDefault();

    startUpdatingMotivo({
      idMotivoTransaccion: idMotivoTransaccion,
      codigoMotivoTransaccion: codigoMotivoTransaccion,
      nombreMotivoTransaccion: nombreMotivoTransaccion,
      idUsuario: idUser,
    });

    Swal.fire(
      "Movimiento actualizado",
      "El movimiento ha sido actualizado con éxito",
      "success"
    );

    startLoadingMotivos();
    onMotivoResetForm();
  };

  const motivos = Array.isArray(motivoData.motivos)
    ? motivoData.motivos
    : [];

  return (
    <>
      <Navbar />
      <div>
        <h3 className="text-center">Actualizar Motivo de Transaccion</h3>
        <form className="container" onSubmit={onMotivoSubmit}>
          <div className="row mt-5 mb-5 d-flex justify-content-center">
            <div className="col-6">
              <label>Seleccione el Motivo de Transaccion</label>
              <select
                className="form-select mt-3"
                name="idMotivoTransaccion"
                value={idMotivoTransaccion}
                onChange={onMotivoInputChange}
              >
                <option value="">Seleccione el Motivo de Transaccion</option>
                {motivos.map((motivo) => (
                  <option
                    key={motivo.idMotivoTransaccion}
                    value={motivo.idMotivoTransaccion}
                  >
                    {motivo.nombreMotivoTransaccion}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <label>Código del Motivo de Transaccion</label>
              <input
                value={codigoMotivoTransaccion}
                onChange={onMotivoInputChange}
                name="codigoMotivoTransaccion"
                className="form-control mt-3"
                type="text"
              />
            </div>
            <div className="col-6">
              <label>Nombre del Motivo de Transaccion</label>
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
            Actualizar
          </button>
        </form>
      </div>
    </>
  );
};
