import { useDispatch, useSelector } from "react-redux";
import { onAddNewMotivo, onDeleteMotivo, onLoadMotivo, onUpdateMotivo } from "../store";
import bancaApi from "../api/bancaApi";

export const useMotivoStore = () => {
  const { motivos, loading, errorMessage } = useSelector(
    (state) => state.motivos
  );
  const dispatch = useDispatch();

  const startLoadingMotivos = async () => {
    try {
      const data = await bancaApi.get("/parametros/motivoTransaccion");
      // console.log(data);
      dispatch(
        onLoadMotivo({
          motivos: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startUpdatingMotivo = async ({
    idMotivoTransaccion,
    codigoMotivoTransaccion,
    nombreMotivoTransaccion,
    idUsuario,
  }) => {
    try {
      const filteredData = {
        idUsuario,
        ...(codigoMotivoTransaccion && { codigoMotivoTransaccion }),
        ...(nombreMotivoTransaccion && { nombreMotivoTransaccion }),
      };

      const data = await bancaApi.put(
        `/parametros/motivoTransaccion/actualizar/${idMotivoTransaccion}`,
        filteredData
      );
      dispatch(
        onUpdateMotivo({
          motivos: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startSavingMotivo = async ({
    idTipoTransaccion,
    codigoMotivoTransaccion,
    nombreMotivoTransaccion,
    idUsuario,
  }) => {
    try {
      const data = await bancaApi.post("/parametros/motivoTransaccion/crear", {
        idTipoTransaccion: idTipoTransaccion,
        codigoMotivoTransaccion: codigoMotivoTransaccion,
        nombreMotivoTransaccion: nombreMotivoTransaccion,
        idUsuario: idUsuario,
      });
      dispatch(
        onAddNewMotivo({
          motivos: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startDelitingMotivo = async ({ idMotivoTransaccion }) => {
    console.log({ idMotivoTransaccion });
    try {
      await bancaApi.delete(
        `/parametros/motivoTransaccion/eliminar/${idMotivoTransaccion}`
      );
      dispatch(
        onDeleteMotivo({
          motivos: idMotivoTransaccion,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    //* Propiedades
    motivos,
    loading,
    errorMessage,

    //* Métodos
    startLoadingMotivos,
    startUpdatingMotivo,
    startSavingMotivo,
    startDelitingMotivo,
  };
};
