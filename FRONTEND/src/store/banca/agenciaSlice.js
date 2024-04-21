import { createSlice } from "@reduxjs/toolkit";

export const agenciasSlice = createSlice({
  name: "agencias",
  initialState: {
    agencias: [],
    loading: false,
    errorMessage: undefined,
  },
  reducers: {
    onLoadAgencia: (state, { payload = [] }) => {
      state.loading = false;
      state.agencias = payload;
    },
    onUpdateAgencia: (state, { payload = [] }) => {
      state.loading = false;
      state.agencias = payload;
    },
    onDeleteAgencia: (state, { payload = [] }) => {
      state.loading = false;
      state.agencias = payload;
    },
    onAddNewAgencia: (state, { payload = [] }) => {
      state.loading = false;
      state.agencias = payload;
    },
  },
});

export const {
  onLoadAgencia,
  onUpdateAgencia,
  onDeleteAgencia,
  onAddNewAgencia,
} = agenciasSlice.actions;
