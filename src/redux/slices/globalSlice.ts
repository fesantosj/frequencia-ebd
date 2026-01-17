import { createSlice } from "@reduxjs/toolkit";
import { resetAll } from "../actions/actions";

export interface IGlobalAppState {
  headerTitle: string;
}

const initialState: IGlobalAppState = {
  headerTitle: "Início",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    atualizarTituloHeader: (state, action) => {
      state.headerTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Resetar estado
    builder.addCase(resetAll, (state) => {      
    });
  },
});

export const { atualizarTituloHeader } = globalSlice.actions;

export default globalSlice.reducer;