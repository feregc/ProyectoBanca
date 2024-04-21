import { useDispatch, useSelector } from "react-redux";
import bancaApi from "../api/bancaApi";
import { onDeleteUsuario, onLoadUsuario, onUpdateUsuario } from "../store";

export const useUsuarioStore = () => {
  const { usuario, loading, errorMessage } = useSelector(
    (state) => state.usuarios
  );
  const dispatch = useDispatch();

  const startLoadingUsuarios = async () => {
    try {
      const data = await bancaApi.get("/seguridad/auth/usuario");
      //console.log(data);
      dispatch(
        onLoadUsuario({
          usuario: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startUpdatingUsuarios = async ({
    codigoUsuario,
    nombreUsuario,
    passwordUsuario,
    isActivo,
    idUsuario,
  }) => {
    try {
      const filteredData = {
        idUsuario,
        ...(codigoUsuario && { codigoUsuario }),
        ...(nombreUsuario && { nombreUsuario }),
        ...(passwordUsuario && { passwordUsuario }),
        ...(isActivo && { isActivo }),
      };

      console.log(filteredData);

      const data = await bancaApi.put(
        `/seguridad/auth/actualizar/${idUsuario}`,
        filteredData
      );
      dispatch(
        onUpdateUsuario({
          usuario: data,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const startDelitingUsuario = async ({ idUsuario }) => {
    console.log({ idUsuario });
    try {
      await bancaApi.delete(`/seguridad/auth/eliminar/${idUsuario}`);
      dispatch(
        onDeleteUsuario({
          usuario: idUsuario,
        })
      );
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    //* Propiedades
    usuario,
    loading,
    errorMessage,

    //* Métodos
    startLoadingUsuarios,
    startUpdatingUsuarios,
    startDelitingUsuario,
  };
};
