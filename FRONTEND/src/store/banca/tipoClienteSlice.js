import { createSlice } from "@reduxjs/toolkit";

export const tipoClienteSlice = createSlice({
  name: "tipoClientes",
  initialState: {
    tipoCliente: [],
    loading: false,
    errorMessage: undefined,
  },
  reducers: {
    onLoadTipoCliente: (state, { payload = [] }) => {
      state.loading = false;
      state.tipoCliente = payload;
    },
    onUpdateTipoCliente: (state, { payload = [] }) => {
      state.loading = false;
      state.tipoCliente = payload;
    },
    onDeleteTipoCliente: (state, { payload = [] }) => {
      state.loading = false;
      state.tipoCliente = payload;
    },
    onAddNewTipoCliente: (state, { payload = [] }) => {
      state.loading = false;
      state.tipoCliente = payload;
    },
  },
});

export const {
  onLoadTipoCliente,
  onAddNewTipoCliente,
  onDeleteTipoCliente,
  onUpdateTipoCliente,
} = tipoClienteSlice.actions;
