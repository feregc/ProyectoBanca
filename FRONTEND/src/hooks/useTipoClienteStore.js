import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewTipoCliente,
  onDeleteTipoCliente,
  onLoadTipoCliente,
  onUpdateTipoCliente,
} from "../store";
import bancaApi from "../api/bancaApi";

export const useTipoClienteStore = () => {
  const { tipoCliente, loading, errorMessage } = useSelector(
    (state) => state.tipoClientes
  );
  const dispatch = useDispatch();

  const startLoadingTipoCliente = async () => {
    try {
      const data = await bancaApi.get("/general/tipoCliente");
      // console.log(data);
      dispatch(
        onLoadTipoCliente({
          tipoCliente: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startUpdatingTipoCliente = async ({
    idTipoCliente,
    codigoTipoCliente,
    nombreTipoCliente,
    idUsuario,
  }) => {
    try {
      const filteredData = {
        idUsuario,
        ...(codigoTipoCliente && { codigoTipoCliente }),
        ...(nombreTipoCliente && { nombreTipoCliente }),
      };

      const data = await bancaApi.put(
        `/general/tipoCliente/actualizar/${idTipoCliente}`,
        filteredData
      );
      dispatch(
        onUpdateTipoCliente({
          tipoCliente: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startSavingTipoCliente = async ({
    codigoTipoCliente,
    nombreTipoCliente,
    idUsuario,
  }) => {
    try {
      const data = await bancaApi.post("/general/tipoCliente/crear", {
        codigoTipoCliente: codigoTipoCliente,
        nombreTipoCliente: nombreTipoCliente,
        idUsuario: idUsuario,
      });
      dispatch(
        onAddNewTipoCliente({
          tipoCliente: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startDelitingTipoCliente = async ({ idTipoCliente }) => {
    console.log({ idTipoCliente });
    try {
      await bancaApi.delete(`/general/tipoCliente/eliminar/${idTipoCliente}`);
      dispatch(
        onDeleteTipoCliente({
          tipoCliente: idTipoCliente,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    //* Propiedades
    tipoCliente,
    loading,
    errorMessage,

    //* Métodos
    startLoadingTipoCliente,
    startUpdatingTipoCliente,
    startSavingTipoCliente,
    startDelitingTipoCliente,
  };
};
