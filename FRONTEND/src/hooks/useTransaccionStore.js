import { useDispatch, useSelector } from "react-redux";
import { onLoadingTransaccion, onSetTransaccion } from "../store";
import bancaApi from "../api/bancaApi";

export const useTransaccionStore = () => {
  const { transacciones, loading, errorMessage } = useSelector(
    (state) => state.transacciones
  );
  const dispatch = useDispatch();

  const startSavingTransacciones = async ({
    idMotivoTransaccion,
    idAgencia,
    idCliente,
    fechaTransaccion,
    montoTransaccion,
    idUsuario,
  }) => {
    try {
      const data = await bancaApi.post("/transaccional/transacciones/new", {
        idMotivoTransaccion,
        idAgencia,
        idCliente,
        fechaTransaccion,
        montoTransaccion,
        idUsuario,
      });
      console.log(data);
      dispatch(
        onSetTransaccion({
          transacciones: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startLoadingTransacciones = async () => {
    try {
      const data = await bancaApi.get("/transaccional/transacciones");
      console.log(data);
      dispatch(
        onLoadingTransaccion({
          transacciones: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  }

  const startLoadingData = async ({idTransaccion}) => {
    try {
      const data = await bancaApi.get(`/transaccional/transacciones/${idTransaccion}`);
      console.log(data);
      dispatch(
        onLoadingTransaccion({
          transacciones: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    //* Propiedades
    transacciones,
    loading,
    errorMessage,

    //* Métodos
    startSavingTransacciones,
    startLoadingTransacciones,
    startLoadingData,
  };
};
