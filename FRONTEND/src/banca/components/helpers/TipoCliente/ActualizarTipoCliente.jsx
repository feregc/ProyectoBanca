import Swal from "sweetalert2";
import { useAuthStore, useForm, useTipoClienteStore } from "../../../../hooks";

import { Navbar } from "../../Navbar";
import { useEffect } from "react";

const TipoClienteFormFields = {
  idTipoCliente: "",
  codigoTipoCliente: "",
  nombreTipoCliente: "",
  idUsuario: "",
};

export const ActualizarTipoCliente = () => {
  const {
    startLoadingTipoCliente,
    startUpdatingTipoCliente,
    tipoCliente: tipoClienteData,
  } = useTipoClienteStore();
  const { user } = useAuthStore();

  const idUser = user.uid;

  const {
    idTipoCliente,
    codigoTipoCliente,
    nombreTipoCliente,
    onInputChange: onTipoClienteInputChange,
    onResetForm: onTipoClienteResetForm,
  } = useForm(TipoClienteFormFields);

  useEffect(() => {
    startLoadingTipoCliente();
  }, []);

  const onClienteSubmit = (e) => {
    e.preventDefault();

    startUpdatingTipoCliente({
      idTipoCliente: idTipoCliente,
      codigoTipoCliente: codigoTipoCliente,
      nombreTipoCliente: nombreTipoCliente,
      idUsuario: idUser,
    });

    Swal.fire(
      "Tipo de cliente actualizado",
      "El Tipo de cliente ha sido actualizado con éxito",
      "success"
    );

    startLoadingTipoCliente();
    onTipoClienteResetForm();
  };

  const tipoClientes = Array.isArray(tipoClienteData.tipoCliente)
    ? tipoClienteData.tipoCliente
    : [];

  return (
    <>
      <Navbar />
      <div>
        <h3 className="text-center">Actualizar Tipo Cliente</h3>
        <form className="container" onSubmit={onClienteSubmit}>
          <div className="row mt-5 mb-5 d-flex justify-content-center">
            <div className="col-6">
              <label>Id Tipo de Ciente</label>
              <select
                className="form-select mt-3"
                name="idTipoCliente"
                value={idTipoCliente}
                onChange={onTipoClienteInputChange}
              >
                <option value="">Seleccione el Tipo de cliente</option>
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
          <div className="row mt-3">
            <div className="col-6">
              <label>Código del Tipo de Cliente</label>
              <input
                value={codigoTipoCliente}
                onChange={onTipoClienteInputChange}
                name="codigoTipoCliente"
                className="form-control mt-3"
                type="text"
              />
            </div>
            <div className="col-6">
              <label>Nombre del Tipo de Cliente</label>
              <input
                value={nombreTipoCliente}
                onChange={onTipoClienteInputChange}
                name="nombreTipoCliente"
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
