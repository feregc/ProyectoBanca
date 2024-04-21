import Swal from "sweetalert2";
import {
  useAuthStore,

  useClienteStore,

  useForm,
  useTipoClienteStore,
} from "../../../../hooks";

import { Navbar } from "../../Navbar";
import { useEffect } from "react";

const ClienteFormFields = {
  idCliente: "",
  idTipoCliente: "",
  codigoCliente: "",
  numeroIdentidad: "",
  nombreCliente: "",
  idUsuario: "",
};

export const CrearCliente = () => {
  const { startLoadingTipoCliente, tipoCliente: tipoClienteData } = useTipoClienteStore();
  const { startSavingCliente } = useClienteStore();
  const { user } = useAuthStore();

  const idUser = user.uid;

  const {
    idTipoCliente,
    codigoCliente,
    numeroIdentidad,
    nombreCliente,
    onInputChange: onClienteInputChange,
    onResetForm: onClienteResetForm,
  } = useForm(ClienteFormFields);

  useEffect(() => {
    startLoadingTipoCliente();
  }, []);


  const onClienteSubmit = (e) => {
    e.preventDefault();

    if (!idTipoCliente || !codigoCliente || !numeroIdentidad || !nombreCliente) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    startSavingCliente({
      idTipoCliente: idTipoCliente,
      codigoCliente: codigoCliente,
      numeroIdentidad: numeroIdentidad,
      nombreCliente: nombreCliente,
      idUsuario: idUser,
    });

    Swal.fire(
      "Cliente creado",
      "El cliente ha sido creado con éxito",
      "success"
    );

    startLoadingTipoCliente();

    onClienteResetForm();
  };

  const tipoClientes = Array.isArray(tipoClienteData.tipoCliente) ? tipoClienteData.tipoCliente : [];

  return (
    <>
      <Navbar />
      <div>
        <h3 className="text-center">Crear Cliente</h3>
        <form className="container" onSubmit={onClienteSubmit}>
          <div className="row mt-3">
            <div className="col-6">
              <label>Id Tipo de Ciente</label>
              <select
                className="form-select mt-3"
                name="idTipoCliente"
                value={idTipoCliente}
                onChange={onClienteInputChange}
              >
                <option value="">Seleccione el tipo de cliente</option>
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
          </div>
          <div className="row mt-3">
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
            <div className="col-6">
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
            Crear
          </button>
        </form>
      </div>
    </>
  );
};
