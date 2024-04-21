import { useEffect } from "react";
import { useClienteStore, useForm } from "../../../../hooks";
import { Navbar } from "../../Navbar";
import Swal from "sweetalert2";

const ClienteFormFields = {
  idCliente: "",
};

export const EliminarCliente = () => {
  const {
    clientes: clientesData,
    startDelitingCliente,
    startLoadingClientes
  } = useClienteStore();

  const {
    idCliente,
    onInputChange: onClienteInputChange,
    onResetForm: onClienteResetForm,
  } = useForm(ClienteFormFields);

  useEffect(() => {
    startLoadingClientes();
  }, []);

  const onAgenciaSubmit = (e) => {
    e.preventDefault();

    startDelitingCliente({
      idCliente: idCliente,
    });

    Swal.fire(
      "Cliente eliminado",
      "El Cliente ha sido eliminado con éxito",
      "success"
    );
    startLoadingClientes();
    onClienteResetForm();
  };

  const clientes = Array.isArray(clientesData.clientes)
    ? clientesData.clientes
    : [];
  return (
    <>
      <Navbar />
      <div>
        <h2 className="text-center">Eliminar Cliente</h2>
        <form className="container" onSubmit={onAgenciaSubmit}>
          <div className="row mt-5 mb-5 d-flex justify-content-center">
            <div className="col-6 ">
              <label>Seleccionar Cliente:</label>
              <select
                className="form-select mt-3"
                name="idCliente"
                value={idCliente}
                onChange={onClienteInputChange} //Aquí está el error
              >
                <option value="">Seleccionar Cliente</option>
                {clientes.map((cliente) => (
                  <option
                    key={cliente.idCliente}
                    value={cliente.idCliente}
                  >
                    {cliente.nombreCliente}
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
