import { useEffect } from "react";
import { useAgenciaStore, useForm } from "../../../../hooks";
import { Navbar } from "../../Navbar";
import Swal from "sweetalert2";

const AgenciaFormFields = {
  idAgencia: "",
  idCanalServicio: "",
  codigoAgencia: "",
  nombreAgencia: "",
  direccionAgencia: "",
  telefonoAgencia: "",
};

export const EliminarAgencia = () => {
  const {
    startLoadingAgencias,
    agencias: agenciasData,
    startDelitingAgencia,
  } = useAgenciaStore();

  const {
    idAgencia,
    onInputChange: onAgenciaInputChange,
    onResetForm: onAgenciaResetForm,
  } = useForm(AgenciaFormFields);

  useEffect(() => {
    startLoadingAgencias();
  }, []);

  const onAgenciaSubmit = (e) => {
    e.preventDefault();

    startDelitingAgencia({
      idAgencia: idAgencia,
    });

    Swal.fire(
      "Agencia eliminadaa",
      "La agencia ha sido eliminada con éxito",
      "success"
    );
    startLoadingAgencias();
    onAgenciaResetForm();
  };

  const agencias = Array.isArray(agenciasData.agencias)
    ? agenciasData.agencias
    : [];
  return (
    <>
      <Navbar />
      <div>
        <h3 className="text-center">Eliminar Agencia</h3>
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
          <button className="btn btn-danger mt-3" type="submit">
            Eliminar
          </button>
        </form>
      </div>
    </>
  );
};
