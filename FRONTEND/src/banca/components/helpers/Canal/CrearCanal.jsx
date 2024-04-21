import Swal from "sweetalert2";
import {
  useAuthStore,
  useCanalStore,
  useForm,
} from "../../../../hooks";

import { Navbar } from "../../Navbar";

const CanalesFormFields = {
  idCanalServicio: "",
  codigoCanalServicio: "",
  nombreCanalServicio: "",
  idUsuario: "",
};

export const CrearCanal = () => {
  const { startSavingCanal } = useCanalStore();
  const { user } = useAuthStore();

  const idUser = user.uid;

  const {
    codigoCanalServicio,
    nombreCanalServicio,
    onInputChange: onAgenciaInputChange,
    onResetForm: onAgenciaResetForm,
  } = useForm(CanalesFormFields);


  const onAgenciaSubmit = (e) => {
    e.preventDefault();

    if (codigoCanalServicio === "" || nombreCanalServicio === "") {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    startSavingCanal({
      codigoCanalServicio: codigoCanalServicio,
      nombreCanalServicio: nombreCanalServicio,
      idUsuario: idUser,
    });

    Swal.fire(
      "Canal de servicio creado",
      "El canal de servicio ha sido creado con éxito",
      "success"
    );

    onAgenciaResetForm();
  };

  return (
    <>
      <Navbar />
      <div>
        <h3 className="text-center">Crear Canal de Servicio</h3>
        <form className="container" onSubmit={onAgenciaSubmit}>
          <div className="row mt-3">
            <div className="col-6">
              <label>Código del Canal de Servicio</label>
              <input
                value={codigoCanalServicio}
                onChange={onAgenciaInputChange}
                name="codigoCanalServicio"
                className="form-control mt-3"
                type="text"
              />
            </div>
            <div className="col-6">
              <label>Nombre del Canal de Servicio</label>
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
            Crear
          </button>
        </form>
      </div>
    </>
  );
};
