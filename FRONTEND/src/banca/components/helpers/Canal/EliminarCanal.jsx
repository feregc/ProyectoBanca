import { useEffect } from "react";
import { useCanalStore, useForm } from "../../../../hooks";
import { Navbar } from "../../Navbar";
import Swal from "sweetalert2";

const CanalFormFields = {
  idCanalServicio: "",
};

export const EliminarCanal = () => {
  const {
    startLoadingCanales,
    canal: canalesData,
    startDelitingCanal,
  } = useCanalStore();

  const {
    idCanalServicio,
    onInputChange: onAgenciaInputChange,
    onResetForm: onAgenciaResetForm,
  } = useForm(CanalFormFields);

  useEffect(() => {
    startLoadingCanales();
  }, []);

  const onAgenciaSubmit = (e) => {
    e.preventDefault();

    startDelitingCanal({
      idCanalServicio: idCanalServicio,
    });

    Swal.fire(
      "Canal de servicio eliminado",
      "El canal de servicio ha sido eliminado con éxito",
      "success"
    );
    startLoadingCanales();
    onAgenciaResetForm();
    startLoadingCanales();
  };

  const canales = Array.isArray(canalesData.canal)
    ? canalesData.canal
    : [];
  return (
    <>
      <Navbar />
      <div>
        <h2 className="text-center">Eliminar Canal de Servicio</h2>
        <form className="container" onSubmit={onAgenciaSubmit}>
          <div className="row mt-5 mb-5 d-flex justify-content-center">
            <div className="col-6 ">
              <label>Seleccionar Canal de Servicio:</label>
              <select
                className="form-select mt-3"
                name="idCanalServicio"
                value={idCanalServicio}
                onChange={onAgenciaInputChange}
              >
                <option value="">Seleccionar Canal de Servicio</option>
                {canales.map((canal) => (
                  <option key={canal.idCanalServicio} value={canal.idCanalServicio}>
                    {canal.nombreCanalServicio}
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
