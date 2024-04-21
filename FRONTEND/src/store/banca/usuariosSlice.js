import { createSlice } from "@reduxjs/toolkit";

export const usuariosSlice = createSlice({
  name: "usuarios",
  initialState: {
    usuario: [],
    loading: false,
    errorMessage: undefined,
  },
  reducers: {
    onLoadUsuario: (state, { payload = [] }) => {
      state.loading = false;
      state.usuario = payload;
    },
    onUpdateUsuario: (state, { payload = [] }) => {
      state.loading = false;
      state.usuario = payload;
    },
    onDeleteUsuario: (state, { payload = [] }) => {
      state.loading = false;
      state.usuario = payload;
    },
    onAddNewUsuario: (state, { payload = [] }) => {
      state.loading = false;
      state.usuario = payload;
    },
  },
});

export const {
  onLoadUsuario,
  onAddNewUsuario,
  onDeleteUsuario,
  onUpdateUsuario,
} = usuariosSlice.actions;
