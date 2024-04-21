import { createSlice } from "@reduxjs/toolkit";

export const tipoTransaccionSlice = createSlice({
  name: "tipoTransacciones",
  initialState: {
    tipoTransaccion: [],
    loading: false,
    errorMessage: undefined,
  },
  reducers: {
    onLoadTipoTransaccion: (state, { payload = [] }) => {
      state.loading = false;
      state.tipoTransaccion = payload;
    },
    onUpdateTipoTransaccion: (state, { payload = [] }) => {
      state.loading = false;
      state.tipoTransaccion = payload;
    },
    onDeleteTipoTransaccion: (state, { payload = [] }) => {
      state.loading = false;
      state.tipoTransaccion = payload;
    },
    onAddNewTipoTransaccion: (state, { payload = [] }) => {
      state.loading = false;
      state.tipoTransaccion = payload;
    },
  },
});

export const {
  onLoadTipoTransaccion,
  onAddNewTipoTransaccion,
  onDeleteTipoTransaccion,
  onUpdateTipoTransaccion,
} = tipoTransaccionSlice.actions;
