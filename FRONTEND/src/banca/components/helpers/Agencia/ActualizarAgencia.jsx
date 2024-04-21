import { useEffect } from "react";
import {
  useAgenciaStore,
  useAuthStore,
  useCanalStore,
  useForm,
} from "../../../../hooks";
import Swal from "sweetalert2";
import { Navbar } from "../../Navbar";

const AgenciaFormFields = {
  idAgencia: "",
  idCanalServicio: "",
  codigoAgencia: "",
  nombreAgencia: "",
  direccionAgencia: "",
  telefonoAgencia: "",
};

export const ActualizarAgencia = () => {
  const { startLoadingCanales,  } = useCanalStore();
  const {
    startLoadingAgencias,
    agencias: agenciasData,
    startUpdatingAgencias,
  } = useAgenciaStore();
  const { user } = useAuthStore();

  const idUser = user.uid;

  const {
    idAgencia,
    codigoAgencia,
    nombreAgencia,
    direccionAgencia,
    telefonoAgencia,
    onInputChange: onAgenciaInputChange,
    onResetForm: onAgenciaResetForm,
  } = useForm(AgenciaFormFields);

  useEffect(() => {
    startLoadingCanales();
    startLoadingAgencias();
  }, []);

  const onAgenciaSubmit = (e) => {
    e.preventDefault();

    startUpdatingAgencias({
      idAgencia: idAgencia,
      codigoAgencia: codigoAgencia,
      nombreAgencia: nombreAgencia,
      direccionAgencia: direccionAgencia,
      telefonoAgencia: telefonoAgencia,
      idUsuario: idUser,
    });

    Swal.fire(
      "Agencia actualizada",
      "La agencia ha sido actualizada con éxito",
      "success"
    );

    startLoadingCanales();
    startLoadingAgencias();

    onAgenciaResetForm();
  };
  const agencias = Array.isArray(agenciasData.agencias)
    ? agenciasData.agencias
    : [];
  return (
    <>
    <Navbar/>
      <div>
        <h3 className="text-center">Actualizar Agencia</h3>
        <form className="container" onSubmit={onAgenciaSubmit}>
          <div className="row mt-5 mb-5 d-flex justify-content-center">
            <div className="col-6 ">
              <label>Seleccionar Agencia:</label>
              <select
                className="form-select mt-3"
                name="idAgencia"
                value={idAgencia}
                onChange={onAgenciaInputChange} //Aquí está el error
              >
                <option value="">Seleccionar Agencia</option>
                {agencias.map((agencia) => (
                  <option key={agencia.idAgencia} value={agencia.idAgencia}>
                    {agencia.nombreAgencia}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <h2 className="text-center mb-5">Ingrese nuevos datos</h2>
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
            Actualizar
          </button>
        </form>
      </div>
    </>
  );
};
