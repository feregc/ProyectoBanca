import { useDispatch, useSelector } from "react-redux";
import { onAddNewCanal, onDeleteCanal, onLoadCanal, onUpdateCanal, setMessages } from "../store";
import bancaApi from "../api/bancaApi";

export const useCanalStore = () => {
  const { canal, loading, errorMessage } = useSelector(
    (state) => state.canales
  );

  const dispatch = useDispatch();

  const startLoadingCanales = async () => {
    try {
      const data = await bancaApi.get("/general/canalServicio");
      // console.log(data);
      dispatch(
        onLoadCanal({
          canal: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startUpdatingCanal = async ({
    idCanalServicio,
    codigoCanalServicio,
    nombreCanalServicio,
    idUsuario,
  }) => {
    try {

      const filteredData = {
        idUsuario,
        ...(codigoCanalServicio && { codigoCanalServicio }), 
        ...(nombreCanalServicio && { nombreCanalServicio }), 
      };

      const data = await bancaApi.put(
        `/general/canalServicio/actualizar/${idCanalServicio}`,
        filteredData
      );
      dispatch(
        onUpdateCanal({
          canal: data,
        })
      );
    } catch (error) {
      dispatch(setMessages({
        errorMessage: "No se pudo actualizar la información de la agencia",
      }));
    }
  };

  const startSavingCanal = async ({
    codigoCanalServicio,
    nombreCanalServicio,
    idUsuario,
  }) => {
    try {
      const data = await bancaApi.post("/general/canalServicio/crear", {
        codigoCanalServicio: codigoCanalServicio,
        nombreCanalServicio: nombreCanalServicio,
        idUsuario: idUsuario,
      });
      dispatch(
        onAddNewCanal({
          canal: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startDelitingCanal = async ({idCanalServicio}) => {
    console.log({idCanalServicio});
    try {
      await bancaApi.delete(`/general/canalServicio/eliminar/${idCanalServicio}`);
      dispatch(
        onDeleteCanal({
          canal: idCanalServicio,
        })
      );
    } catch (error) {
      dispatch(setMessages({
        errorMessage: "No se pudo eliminar la información de la agencia",
      }));
    }
  }

  return {
    //* Propiedades
    canal,
    loading,
    errorMessage,

    //* Métodos
    startLoadingCanales,
    startSavingCanal,
    startDelitingCanal,
    startUpdatingCanal,
  };
};
