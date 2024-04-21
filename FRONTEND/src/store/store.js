import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  agenciasSlice,
  motivoSlice,
  clientesSlice,
  transaccionSlice,
  canalSlice,
  tipoClienteSlice,
  tipoTransaccionSlice,
} from "./";
import { usuariosSlice } from "./banca/usuariosSlice";

export const store = configureStore({
  reducer: {
    agencias: agenciasSlice.reducer,
    auth: authSlice.reducer,
    canales: canalSlice.reducer,
    clientes: clientesSlice.reducer,
    motivos: motivoSlice.reducer,
    tipoClientes: tipoClienteSlice.reducer,
    tipoTransacciones: tipoTransaccionSlice.reducer,
    transacciones: transaccionSlice.reducer,
    usuarios: usuariosSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
