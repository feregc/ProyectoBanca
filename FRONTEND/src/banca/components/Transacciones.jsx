import { useEffect, useState } from "react";
import { format } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import {
  useForm,
  useAgenciaStore,
  useMotivoStore,
  useClienteStore,
  useTransaccionStore,
  useAuthStore,
} from "../../hooks";
import Swal from "sweetalert2";
import { Navbar } from "./Navbar";

registerLocale("es", es);

const transaccionFormFields = {
  idMotivoTransaccion: "",
  idAgencia: "",
  idCliente: "",
  fechaTransaccion: "",
  montoTransaccion: "",
  idUsuario: "",
};

export const Transacciones = () => {
  const { startLoadingAgencias, agencias: agenciasData } = useAgenciaStore();
  const { startLoadingMotivos, motivos: motivosData } = useMotivoStore();
  const { startLoadingClientes, clientes: clientesData } = useClienteStore();
  const { startSavingTransacciones } = useTransaccionStore();
  const { user } = useAuthStore();

  const idUser = user.uid;

  const {
    idMotivoTransaccion,
    idAgencia,
    idCliente,
    montoTransaccion,
    onInputChange: onTransactionInputChange,
    onResetForm: onTransactionResetForm,
  } = useForm(transaccionFormFields);

  useEffect(() => {
    startLoadingAgencias();
    startLoadingMotivos();
    startLoadingClientes();
  }, []);

  const [startDate] = useState(new Date());

  const formattedDate = format(startDate, "yyyy-MM-dd'T'HH:mm:ss");

  const transactionSubmit = (e) => {
    e.preventDefault();
    console.log({
      idMotivoTransaccion,
      idAgencia,
      idCliente,
      formattedDate,
      montoTransaccion,
      idUser,
    });

    if (
      montoTransaccion === "" ||
      idCliente === "" ||
      idAgencia === "" ||
      idMotivoTransaccion === ""
    ) {
      Swal.fire(
        "Error al realizar transacción",
        "Todos los campos son obligatorios",
        "error"
      );
      return;
    }

    if (montoTransaccion <= 0) {
      Swal.fire(
        "Error al realizar transacción",
        "El monto mínimo para realizar la transacción es de 1",
        "error"
      );
      return;
    }

    startSavingTransacciones({
      idMotivoTransaccion: idMotivoTransaccion,
      idAgencia: idAgencia,
      idCliente: idCliente,
      fechaTransaccion: formattedDate,
      montoTransaccion: montoTransaccion,
      idUsuario: idUser,
    });
    Swal.fire(
      "Transacción realizada",
      "La transacción se realizó correctamente",
      "success"
    );

    onTransactionResetForm();
  };

  const agencias = agenciasData.agencias;
  const motivos = motivosData.motivos;
  const clientes = clientesData.clientes;

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column align-items-center">
        <div className="row">
          <div className="col-12 my-1 py-2">
            <h2 className="text-center">Formulario de transacciones</h2>
          </div>
        </div>
        <form className="container" onSubmit={transactionSubmit}>
          <div className="row mt-3">
            <div className="col-12">
              <h5>Seleccionar motivo de la transacción:</h5>
              <select
                className="form-select"
                name="idMotivoTransaccion"
                value={idMotivoTransaccion}
                onChange={onTransactionInputChange}
              >
                <option value="">Seleccionar Motivo</option>
                {motivos?.map((motivo) => (
                  <option
                    key={motivo.idMotivoTransaccion}
                    value={motivo.idMotivoTransaccion}
                  >
                    {motivo.nombreMotivoTransaccion}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            {" "}
            <div className="col-12">
              <h5>Seleccionar Agencia:</h5>
              <select
                className="form-select"
                name="idAgencia"
                value={idAgencia}
                onChange={onTransactionInputChange}
              >
                <option value="">Seleccionar Agencia</option>
                {agencias?.map((agencia) => (
                  <option key={agencia.idAgencia} value={agencia.idAgencia}>
                    {agencia.nombreAgencia}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <h5>Seleccionar Cliente:</h5>
              <select
                className="form-select"
                name="idCliente"
                value={idCliente}
                onChange={onTransactionInputChange}
              >
                <option value="">Seleccionar Cliente</option>
                {clientes?.map((clientes) => (
                  <option key={clientes.idCliente} value={clientes.idCliente}>
                    {clientes.nombreCliente}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-3">
              <h5>Fecha de la Transacción:</h5>
              <DatePicker
                name="fechaTransaccion"
                selected={startDate}
                value={startDate}
                onChange={onTransactionInputChange}
                className="form-control"
                dateFormat="Pp"
                showTimeSelect
                locale="es"
                timeCaption="Hora"
                disabled
              />
            </div>
            <div className="col-4">
              <h5>Monto de la Transaccion:</h5>
              <input
                type="number"
                className="form-control"
                name="montoTransaccion"
                placeholder="Monto de la transacción"
                value={montoTransaccion}
                onChange={onTransactionInputChange}
              />
            </div>
          </div>
          <div className="row py-3">
            <div className="col-12 d-flex flex-column align-items-center">
              <button type="submit" className="btn btn-primary">
                Realizar Transacción
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
