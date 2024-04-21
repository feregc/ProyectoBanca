import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewAgencia,
  onDeleteAgencia,
  onLoadAgencia,
  onUpdateAgencia,
} from "../store";
import bancaApi from "../api/bancaApi";

export const useAgenciaStore = () => {
  const { agencias, loading, errorMessage } = useSelector(
    (state) => state.agencias
  );
  const dispatch = useDispatch();

  const startLoadingAgencias = async () => {
    try {
      const data = await bancaApi.get("/general/agencias");
      dispatch(
        onLoadAgencia({
          agencias: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startUpdatingAgencias = async ({
    idAgencia,
    codigoAgencia,
    nombreAgencia,
    direccionAgencia,
    telefonoAgencia,
    idUsuario,
  }) => {
    try {

      const filteredData = {
        idUsuario,
        ...(codigoAgencia && { codigoAgencia }),
        ...(nombreAgencia && { nombreAgencia }),
        ...(direccionAgencia && { direccionAgencia }), 
        ...(telefonoAgencia && { telefonoAgencia }), 
      };

      const data = await bancaApi.put(
        `/general/agencias/actualizar/${idAgencia}`,
        filteredData
      );
      dispatch(
        onUpdateAgencia({
          agencias: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startSavingAgencia = async ({
    idCanalServicio,
    codigoAgencia,
    nombreAgencia,
    direccionAgencia,
    telefonoAgencia,
    idUsuario,
  }) => {
    try {
      const data = await bancaApi.post("/general/agencias/crear", {
        idCanalServicio: idCanalServicio,
        codigoAgencia: codigoAgencia,
        nombreAgencia: nombreAgencia,
        direccionAgencia: direccionAgencia,
        telefonoAgencia: telefonoAgencia,
        idUsuario: idUsuario,
      });
      dispatch(
        onAddNewAgencia({
          agencias: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startDelitingAgencia = async ({idAgencia}) => {
    console.log({idAgencia});
    try {
      await bancaApi.delete(`/general/agencias/eliminar/${idAgencia}`);
      dispatch(
        onDeleteAgencia({
          agencias: idAgencia,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    //* Propiedades
    agencias,
    loading,
    errorMessage,

    //* Métodos
    startLoadingAgencias,
    startSavingAgencia,
    startUpdatingAgencias,
    startDelitingAgencia,
  };
};
