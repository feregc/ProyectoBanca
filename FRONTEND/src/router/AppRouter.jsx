import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "../auth";
import { useAuthStore } from "../hooks";
import { BancaPage, Reportes, Transacciones, Administrador } from "../banca";
import {
  ActualizarAgencia,
  ActualizarCanal,
  ActualizarCliente,
  ActualizarMotivoTransaccion,
  ActualizarTipoCliente,
  ActualizarTipoTransaccion,
  ActualizarUsuario,
  CrearAgencia,
  CrearCanal,
  CrearCliente,
  CrearMotivoTransaccion,
  CrearTipoCliente,
  CrearTipoTransaccion,
  EliminarAgencia,
  EliminarCanal,
  EliminarCliente,
  EliminarMotivoTransaccion,
  EliminarTipoCliente,
  EliminarTipoTransaccion,
  EliminarUsuario,
} from "../banca/components/helpers";
import { useEffect } from "react";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/seguridad/auth" element={<LoginPage />} />
          <Route path="/seguridad/auth/register" element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to="/seguridad/auth" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<BancaPage />} />
          <Route
            path="/transaccional/transacciones"
            element={<Transacciones />}
          />
          <Route path="/administrar" element={<Administrador />} />
          <Route
            path="/administrar/agencias/crear"
            element={<CrearAgencia />}
          />
          <Route
            path="/administrar/agencias/actualizar"
            element={<ActualizarAgencia />}
          />
          <Route
            path="/administrar/agencias/eliminar"
            element={<EliminarAgencia />}
          />
          <Route path="/administrar/canales/crear" element={<CrearCanal />} />
          <Route
            path="/administrar/canales/actualizar"
            element={<ActualizarCanal />}
          />
          <Route
            path="/administrar/canales/eliminar"
            element={<EliminarCanal />}
          />
          <Route
            path="/administrar/clientes/crear"
            element={<CrearCliente />}
          />
          <Route
            path="/administrar/clientes/actualizar"
            element={<ActualizarCliente />}
          />
          <Route
            path="/administrar/clientes/eliminar"
            element={<EliminarCliente />}
          />
          <Route
            path="/administrar/tipoClientes/crear"
            element={<CrearTipoCliente />}
          />
          <Route
            path="/administrar/tipoClientes/actualizar"
            element={<ActualizarTipoCliente />}
          />
          <Route
            path="/administrar/tipoClientes/eliminar"
            element={<EliminarTipoCliente />}
          />
          <Route
            path="/administrar/tipoTransaccion/crear"
            element={<CrearTipoTransaccion />}
          />
          <Route
            path="/administrar/tipoTransaccion/actualizar"
            element={<ActualizarTipoTransaccion />}
          />
          <Route
            path="/administrar/tipoTransaccion/eliminar"
            element={<EliminarTipoTransaccion />}
          />
          <Route
            path="/administrar/motivoTransaccion/crear"
            element={<CrearMotivoTransaccion />}
          />
          <Route
            path="/administrar/motivoTransaccion/actualizar"
            element={<ActualizarMotivoTransaccion />}
          />
          <Route
            path="/administrar/motivoTransaccion/eliminar"
            element={<EliminarMotivoTransaccion />}
          />
          <Route
            path="/administrar/usuario/actualizar"
            element={<ActualizarUsuario />}
          />
          <Route
            path="/administrar/usuario/eliminar"
            element={<EliminarUsuario />}
          />

          <Route path="/general/reportes" element={<Reportes />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}
      {/* <Route path="/*" element={ <Navigate to="/seguridad/auth/"/>  }/> */}
    </Routes>
  );
};
