import { useEffect } from "react";
import {
  useAuthStore,
  useCanalStore,
  useForm,
} from "../../../../hooks";
import Swal from "sweetalert2";
import { Navbar } from "../../Navbar";

const CanalesFormFields = {
  idCanalServicio: "",
  codigoCanalServicio: "",
  nombreCanalServicio: "",
  idUsuario: "",
};

export const ActualizarCanal = () => {
  const {
    startLoadingCanales,
    canal: canalesData,
    startUpdatingCanal,
  } = useCanalStore();

  const { user } = useAuthStore();

  const idUser = user.uid;

  const {
    idCanalServicio,
    codigoCanalServicio,
    nombreCanalServicio,
    onInputChange: onAgenciaInputChange,
    onResetForm: onAgenciaResetForm,
  } = useForm(CanalesFormFields);

  useEffect(() => {
    startLoadingCanales();
  }, []);

  const onAgenciaSubmit = (e) => {
    e.preventDefault();

    startUpdatingCanal({
      idCanalServicio: idCanalServicio,
      codigoCanalServicio: codigoCanalServicio,
      nombreCanalServicio: nombreCanalServicio,
      idUsuario: idUser,
    });

    Swal.fire(
      "Canal de servicio actualizado",
      "El canal de servicio ha sido actualizado con éxito",
      "success"
    );

    startLoadingCanales();

    onAgenciaResetForm();
  };
  const canales = Array.isArray(canalesData.canal) ? canalesData.canal : [];
  return (
    <>
      <Navbar />
      <div>
        <h2 className="text-center">Actualizar Canal de Servicio</h2>
        <form className="container" onSubmit={onAgenciaSubmit}>
          <div className="row mt-5 mb-5 d-flex justify-content-center">
            <div className="col-6 ">
              <label>Seleccionar Canal de Servicio:</label>
              <select
                className="form-select mt-3"
                name="idCanalServicio"
                value={idCanalServicio}
                onChange={onAgenciaInputChange} //Aquí está el error
              >
                <option value="">Seleccionar Canal de Servicio</option>
                {canales.map((canal) => (
                  <option
                    key={canal.idCanalServicio}
                    value={canal.idCanalServicio}
                  >
                    {canal.nombreCanalServicio}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <h3 className="text-center mb-5">Ingrese nuevos datos</h3>
            <div className="col-6">
              <label>Código del Canal de Servicio Nuevo</label>
              <input
                value={codigoCanalServicio}
                onChange={onAgenciaInputChange}
                name="codigoCanalServicio"
                className="form-control mt-3"
                type="text"
              />
            </div>
            <div className="col-6">
              <label>Nombre del Canal de Servicio Nuevo</label>
              <input
                value={nombreCanalServicio}
                onChange={onAgenciaInputChange}
                name="nombreCanalServicio"
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
