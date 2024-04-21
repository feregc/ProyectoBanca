import { createSlice } from "@reduxjs/toolkit";

export const motivoSlice = createSlice({
  name: "motivos",
  initialState: {
    motivos: [],
    loading: false,
    errorMessage: undefined,
  },
  reducers: {
    onLoadMotivo: (state, { payload = [] }) => {
      state.loading = false;
      state.motivos = payload;
    },
    onUpdateMotivo: (state, { payload = [] }) => {
      state.loading = false;
      state.motivos = payload;
    },
    onDeleteMotivo: (state, { payload = [] }) => {
      state.loading = false;
      state.motivos = payload;
    },
    onAddNewMotivo: (state, { payload = [] }) => {
      state.loading = false;
      state.motivos = payload;
    },
  },
});

export const { onLoadMotivo, onAddNewMotivo, onDeleteMotivo, onUpdateMotivo } =
  motivoSlice.actions;
