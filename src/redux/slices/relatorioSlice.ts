import { createSlice } from "@reduxjs/toolkit";
import { resetAll } from "../actions/actions";
import { gerarRelatorioGeral } from "@/request/relatorioRequest";

export interface RelatorioState {
  loading: boolean;
  base64: string;
  blob: string;
}

const initialState: RelatorioState = {
  loading: false,
  base64: "",
  blob: ""
};

const relatorioSlice = createSlice({
  name: "relatorio",
  initialState,
  reducers: {   
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, () => initialState);

    //listar
    builder.addCase(gerarRelatorioGeral.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(gerarRelatorioGeral.fulfilled, (state, action) => {        
      state.base64 = action.payload?.relatorioBase64;
      state.loading = false;
    });
    builder.addCase(gerarRelatorioGeral.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {  } = relatorioSlice.actions;

export default relatorioSlice.reducer;
