import { useEffect } from "react";
import {
  useAuthStore,
  useClienteStore,
  useForm,
} from "../../../../hooks";
import Swal from "sweetalert2";
import { Navbar } from "../../Navbar";

const ClienteFormFields = {
  idCliente: "",
  codigoCliente: "",
  numeroIdentidad: "",
  nombreCliente: "",
  idUsuario: "",
};

export const ActualizarCliente = () => {

  const { clientes: clientesData, startUpdatingClientes, startLoadingClientes } = useClienteStore();

  const { user } = useAuthStore();

  const idUser = user.uid;

  const {
    idCliente,
    codigoCliente,
    numeroIdentidad,
    nombreCliente,
    onInputChange: onClienteInputChange,
    onResetForm: onClienteResetForm,
  } = useForm(ClienteFormFields);

  useEffect(() => {
    startLoadingClientes();
  }, []);

  const onAgenciaSubmit = (e) => {
    e.preventDefault();

    console.log({
      idCliente,
      codigoCliente,
      numeroIdentidad,
      nombreCliente,
      idUser,
    
    });

    startUpdatingClientes({
      idCliente: idCliente,
      codigoCliente: codigoCliente,
      numeroIdentidad: numeroIdentidad,
      nombreCliente: nombreCliente,
      idUsuario: idUser,
    });

    Swal.fire(
      "Cliente actualizado",
      "El cliente ha sido actualizado con éxito",
      "success"
    );

    startLoadingClientes();

    onClienteResetForm();
  };

  const clientes = Array.isArray(clientesData.clientes) ? clientesData.clientes : [];
  return (
    <>
      <Navbar />
      <div>
        <h2 className="text-center">Actualizar Cliente</h2>
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
          <div className="row mt-3">
            <h3 className="text-center mb-5">Ingrese nuevos datos</h3>
            <div className="col-6">
              <label>Código de Cliente</label>
              <input
                value={codigoCliente}
                onChange={onClienteInputChange}
                name="codigoCliente"
                className="form-control mt-3"
                type="text"
              />
            </div>
            <div className="col-6">
              <label>Número de Identidad</label>
              <input
                value={numeroIdentidad}
                onChange={onClienteInputChange}
                name="numeroIdentidad"
                className="form-control mt-3"
                type="text"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <label>Nombre de Cliente</label>
              <input
                value={nombreCliente}
                onChange={onClienteInputChange}
                name="nombreCliente"
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
