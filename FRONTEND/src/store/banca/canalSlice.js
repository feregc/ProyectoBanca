import { createSlice } from "@reduxjs/toolkit";

export const canalSlice = createSlice({
  name: "canales",
  initialState: {
    canal: [],
    loading: false,
    errorMessage: undefined,
  },
  reducers: {
    onLoadCanal: (state, {payload = []}) => {
      state.loading = false;
      state.canal = payload;
      // console.log(state.canales);
    },
    onUpdateCanal: (state, { payload = [] }) => {
      state.loading = false;
      state.canal = payload;
    },
    onDeleteCanal: (state, { payload = [] }) => {
      state.loading = false;
      state.canal = payload;
    },
    onAddNewCanal: (state, { payload = [] }) => {
      state.loading = false;
      state.canal = payload;
    },
    setMessages: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },

  }
});

export const { onLoadCanal, onAddNewCanal, onDeleteCanal, onUpdateCanal, setMessages } =
  canalSlice.actions;
