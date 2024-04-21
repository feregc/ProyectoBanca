import Swal from "sweetalert2";
import {
  useAgenciaStore,
  useAuthStore,
  useCanalStore,
  useForm,
} from "../../../../hooks";
import { useEffect } from "react";
import { Navbar } from "../../Navbar";

const AgenciaFormFields = {
  idAgencia: "",
  idCanalServicio: "",
  codigoAgencia: "",
  nombreAgencia: "",
  direccionAgencia: "",
  telefonoAgencia: "",
};

export const CrearAgencia = () => {
  const { startLoadingCanales, canal: canalesData } = useCanalStore();
  const { startSavingAgencia } = useAgenciaStore();
  const { user } = useAuthStore();

  const idUser = user.uid;

  const {
    idCanalServicio,
    codigoAgencia,
    nombreAgencia,
    direccionAgencia,
    telefonoAgencia,
    onInputChange: onAgenciaInputChange,
    onResetForm: onAgenciaResetForm,
  } = useForm(AgenciaFormFields);

  useEffect(() => {
    startLoadingCanales();
  }, []);

  const onAgenciaSubmit = (e) => {
    e.preventDefault();

    if (
      idCanalServicio === "" ||
      codigoAgencia === "" ||
      nombreAgencia === "" ||
      direccionAgencia === "" ||
      telefonoAgencia === ""
    ) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    startSavingAgencia({
      idCanalServicio: idCanalServicio,
      codigoAgencia: codigoAgencia,
      nombreAgencia: nombreAgencia,
      direccionAgencia: direccionAgencia,
      telefonoAgencia: telefonoAgencia,
      idUsuario: idUser,
    });

    Swal.fire(
      "Agencia Creada",
      "La agencia ha sido creada con éxito",
      "success"
    );
    startLoadingCanales();

    onAgenciaResetForm();
  };

  const canalesMap = Array.isArray(canalesData.canal) 
  ? canalesData.canal
  : [];

  return (
    <>
    <Navbar/>
      <div>
        <h3 className="text-center">Crear Agencia</h3>
        <form className="container" onSubmit={onAgenciaSubmit}>
          <div className="row mt-3">
            <div className="col-6">
              <label>Canal de Servicio</label>
              <select
                className="form-select mt-3"
                name="idCanalServicio"
                value={idCanalServicio}
                onChange={onAgenciaInputChange}
              >
                <option value="">Seleccione Canal de Servcio</option>
                {canalesMap.map((canal) => (
                  <option
                    key={canal.idCanalServicio}
                    value={canal.idCanalServicio}
                  >
                    {canal.nombreCanalServicio}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label>Código de la Agencia</label>
              <input
                value={codigoAgencia}
                onChange={onAgenciaInputChange}
                name="codigoAgencia"
                className="form-control mt-3"
                type="text"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <label>Nombre de la Agencia</label>
              <input
                value={nombreAgencia}
                onChange={onAgenciaInputChange}
                name="nombreAgencia"
                className="form-control mt-3"
                type="text"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <label>Dirección de la Agencia</label>
              <input
                value={direccionAgencia}
                onChange={onAgenciaInputChange}
                name="direccionAgencia"
                className="form-control mt-3"
                type="text"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <label>Teléfono de la Agencia</label>
              <input
                value={telefonoAgencia}
                onChange={onAgenciaInputChange}
                name="telefonoAgencia"
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
