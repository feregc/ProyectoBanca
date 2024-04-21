import { useEffect } from "react";
import { useForm, useTipoClienteStore } from "../../../../hooks";
import { Navbar } from "../../Navbar";
import Swal from "sweetalert2";

const TipoClienteFormFields = {
  idTipoCliente: ""
};

export const EliminarTipoCliente = () => {
  const { startLoadingTipoCliente, startDelitingTipoCliente, tipoCliente: tipoClienteData } = useTipoClienteStore();


  const {
    idTipoCliente,
    onInputChange: onTipoClienteInputChange,
    onResetForm: onTipoClienteResetForm,
  } = useForm(TipoClienteFormFields);

  useEffect(() => {
    startLoadingTipoCliente();
  }, []);

  const onClienteSubmit = (e) => {
    e.preventDefault();

    startDelitingTipoCliente({
      idTipoCliente: idTipoCliente
    });

    Swal.fire(
      "Tipo de cliente actualizado",
      "El Tipo de cliente ha sido actualizado con éxito",
      "success"
    );

    startLoadingTipoCliente();
    onTipoClienteResetForm();
  };

  const tipoClientes = Array.isArray(tipoClienteData.tipoCliente) ? tipoClienteData.tipoCliente : [];


  return (
    <>
      <Navbar />
      <div>
        <h2 className="text-center">Eliminar Tipo de Cliente</h2>
        <form className="container" onSubmit={onClienteSubmit}>
          <div className="row mt-5 mb-5 d-flex justify-content-center">
            <div className="col-6 ">
              <label>Seleccionar Tipo de Cliente:</label>
              <select
                className="form-select mt-3"
                name="idTipoCliente"
                value={idTipoCliente}
                onChange={onTipoClienteInputChange}
              >
                <option value="">Seleccione Tipo de Cliente</option>
                {tipoClientes.map((tipoCliente) => (
                  <option
                    key={tipoCliente.idTipoCliente}
                    value={tipoCliente.idTipoCliente}
                  >
                    {tipoCliente.nombreTipoCliente}
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
