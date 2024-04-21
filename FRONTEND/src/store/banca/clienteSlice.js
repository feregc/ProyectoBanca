import { createSlice } from "@reduxjs/toolkit";

export const clientesSlice = createSlice({
  name: "clientes",
  initialState: {
    clientes: [],
    loading: false,
    errorMessage: undefined,
  },
  reducers: {
    onLoadCliente: (state, { payload = [] }) => {
      state.loading = false;
      state.clientes = payload;
    },
    onUpdateCliente: (state, { payload = [] }) => {
      state.loading = false;
      state.clientes = payload;
    },
    onDeleteCliente: (state, { payload = [] }) => {
      state.loading = false;
      state.clientes = payload;
    },
    onAddNewCliente: (state, { payload = [] }) => {
      state.loading = false;
      state.clienteslientes = payload;
    },
  },
});

export const {
  onLoadCliente,
  onAddNewCliente,
  onDeleteCliente,
  onUpdateCliente,
} = clientesSlice.actions;
