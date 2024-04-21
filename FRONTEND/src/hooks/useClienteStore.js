import { useDispatch, useSelector } from "react-redux";
import { onAddNewCliente, onDeleteCliente, onLoadCliente, onUpdateCliente } from "../store";
import bancaApi from "../api/bancaApi";

export const useClienteStore = () => {
  const { clientes, loading, errorMessage } = useSelector(
    (state) => state.clientes
  );
  const dispatch = useDispatch();

  const startLoadingClientes = async () => {
    try {
      const data = await bancaApi.get("/general/clientes");
      //console.log(data);
      dispatch(
        onLoadCliente({
          clientes: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startUpdatingClientes = async ({
    idCliente,
    codigoCliente,
    numeroIdentidad,
    nombreCliente,
    idUsuario,
  }) => {
    try {

      const filteredData = {
        idUsuario,
        ...(codigoCliente && { codigoCliente }),
        ...(numeroIdentidad && { numeroIdentidad }), 
        ...(nombreCliente && { nombreCliente }),
      };

      const data = await bancaApi.put(
        `/general/clientes/actualizar/${idCliente}`,
        filteredData
      );
      dispatch(
        onUpdateCliente({
          clientes: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startSavingCliente = async ({
    idTipoCliente,
    codigoCliente,
    numeroIdentidad,
    nombreCliente,
    idUsuario,
  }) => {
    try {
      const data = await bancaApi.post("/general/clientes/crear", {
        idTipoCliente: idTipoCliente,
        numeroIdentidad: numeroIdentidad,
        codigoCliente: codigoCliente,
        nombreCliente: nombreCliente,
        idUsuario: idUsuario,
      });
      dispatch(
        onAddNewCliente({
          cliente: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startDelitingCliente = async ({idCliente}) => {
    console.log({idCliente});
    try {
      await bancaApi.delete(`/general/clientes/eliminar/${idCliente}`);
      dispatch(
        onDeleteCliente({
          clientes: idCliente,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  }

  return {
    //* Propiedades
    clientes,
    loading,
    errorMessage,

    //* Métodos
    startLoadingClientes,
    startUpdatingClientes,
    startSavingCliente,
    startDelitingCliente,
  };
};
