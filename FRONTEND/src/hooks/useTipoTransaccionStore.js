import { useDispatch, useSelector } from "react-redux";
import bancaApi from "../api/bancaApi";
import { onAddNewTipoTransaccion, onDeleteTipoTransaccion, onLoadTipoTransaccion, onUpdateTipoTransaccion } from "../store";

export const useTipoTransaccionStore = () => {
  const { tipoTransaccion, loading, errorMessage } = useSelector(
    (state) => state.tipoTransacciones
  );
  const dispatch = useDispatch();

  const startLoadingTipoTransaccion = async () => {
    try {
      const data = await bancaApi.get("/parametros/tipoTransaccion");
      //console.log(data);
      dispatch(
        onLoadTipoTransaccion({
          tipoTransaccion: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startUpdatingTipoTransaccion = async ({
    idTipoTransaccion,
    codigoTipoMovimiento,
    codigoTipoTransaccion,
    nombreTipoTransaccion,
    idUsuario,
  }) => {
    try {

      const filteredData = {
        idUsuario,
        ...(codigoTipoMovimiento && { codigoTipoMovimiento }),
        ...(codigoTipoTransaccion && { codigoTipoTransaccion }), 
        ...(nombreTipoTransaccion && { nombreTipoTransaccion }),
      };

      const data = await bancaApi.put(
        `/parametros/tipoTransaccion/actualizar/${idTipoTransaccion}`,
        filteredData
      );
      dispatch(
        onUpdateTipoTransaccion({
          tipoTransaccion: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startSavingTipoTransaccion = async ({
    codigoTipoMovimiento,
    codigoTipoTransaccion,
    nombreTipoTransaccion,
    idUsuario,
  }) => {
    try {
      const data = await bancaApi.post("/parametros/tipoTransaccion/crear", {
        codigoTipoMovimiento: codigoTipoMovimiento,
        codigoTipoTransaccion: codigoTipoTransaccion,
        nombreTipoTransaccion: nombreTipoTransaccion,
        idUsuario: idUsuario,
      });
      dispatch(
        onAddNewTipoTransaccion({
          tipoTransaccion: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startDelitingTipoTransaccion = async ({idTipoTransaccion}) => {
    console.log({idTipoTransaccion});
    try {
      await bancaApi.delete(`/parametros/tipoTransaccion/eliminar/${idTipoTransaccion}`);
      dispatch(
        onDeleteTipoTransaccion({
          tipoTransaccion: idTipoTransaccion,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    //* Propiedades
    tipoTransaccion,
    loading,
    errorMessage,

    //* Métodos
    startLoadingTipoTransaccion,
    startUpdatingTipoTransaccion,
    startSavingTipoTransaccion,
    startDelitingTipoTransaccion,
  };
};
