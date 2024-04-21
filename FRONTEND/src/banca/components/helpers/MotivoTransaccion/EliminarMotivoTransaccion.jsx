import { useEffect } from "react";
import { useForm, useMotivoStore } from "../../../../hooks";
import { Navbar } from "../../Navbar";
import Swal from "sweetalert2";

const MotivoFormFields = {
  idMotivoTransaccion: ""
};
export const EliminarMotivoTransaccion = () => {
  const {
    startDelitingMotivo,
    motivos: motivoData,
    startLoadingMotivos
  } = useMotivoStore();

  const {
    idMotivoTransaccion,

    onInputChange: onMotivoInputChange,
    onResetForm: onMotivoResetForm,
  } = useForm(MotivoFormFields);

  useEffect(() => {
    startLoadingMotivos();
  }, []);

  const onMotivoSubmit = (e) => {
    e.preventDefault();

    startDelitingMotivo({
      idMotivoTransaccion: idMotivoTransaccion,
    });

    Swal.fire(
      "Movimiento eliminado",
      "El movimiento ha sido eliminado con éxito",
      "success"
    );

    startLoadingMotivos();
    onMotivoResetForm();
  };

  const motivos = Array.isArray(motivoData.motivos) ? motivoData.motivos : [];
  // const motivos = motivoData.motivos;


  return (
    <>
      <Navbar />
      <div>
        <h2 className="text-center">Eliminar Motivo de Transaccion</h2>
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
          <button className="btn btn-danger mt-3" type="submit">
            Eliminar
          </button>
        </form>
      </div>
    </>
  );
};
