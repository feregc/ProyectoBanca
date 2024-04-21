import { createSlice } from "@reduxjs/toolkit";

export const transaccionSlice = createSlice({
  name: "transacciones",
  initialState: {
    transacciones: [],
    loading: false,
    errorMessage: undefined,
  },
  reducers: {
    onSetTransaccion: (state, {payload = []}) => {
      state.loading = false;
      state.transacciones = payload;
    },
    onLoadingTransaccion: (state, {payload}) => {
      state.loading = true;
      state.transacciones = payload;
    },

  }
});

export const { onSetTransaccion, onLoadingTransaccion } =
  transaccionSlice.actions;
