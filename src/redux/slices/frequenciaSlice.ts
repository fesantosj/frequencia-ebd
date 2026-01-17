import { createSlice } from "@reduxjs/toolkit";
import { resetAll } from "../actions/actions";
import {
  atualizarFrequencia,
  cadastrarFrequencia,
  deletarFrequencia,
  listarFrequencias,
} from "@/request/frequenciaRequest";
import { IFrequencia } from "@/interfaces/frequencia/frequenciaModel";

export interface FrequenciaState {
  loading: boolean;
  listagem: IFrequencia[];
  entidade: IFrequencia;
}

const initialState: FrequenciaState = {
  loading: false,
  listagem: [],
  entidade: {} as IFrequencia,
};

const frequenciaSlice = createSlice({
  name: "frequencia",
  initialState,
  reducers: {
    fillEntity: (state, action) => {
      state.entidade = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, () => initialState);

    //cadastrar
    builder.addCase(cadastrarFrequencia.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(cadastrarFrequencia.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.sucesso) {
        alert(`Sucesso! ${action.payload.mensagem}`);
      } else {
        alert(`Erro! ${action.payload.mensagem}`);
      }
    });
    builder.addCase(cadastrarFrequencia.rejected, (state) => {
      state.loading = false;
    });

    //listar
    builder.addCase(listarFrequencias.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listarFrequencias.fulfilled, (state, action) => {
      state.listagem = action.payload.dados;
      state.loading = false;
    });
    builder.addCase(listarFrequencias.rejected, (state) => {
      state.loading = false;
    });

    //atualizar
    builder.addCase(atualizarFrequencia.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(atualizarFrequencia.fulfilled, (state, action) => {
      if (action.payload.sucesso) {
        alert(`Sucesso! ${action.payload.mensagem}`);
      } else {
        alert(`Erro! ${action.payload.mensagem}`);
      }

      state.loading = false;
    });
    builder.addCase(atualizarFrequencia.rejected, (state) => {
      state.loading = false;
    });

    //deletar
    builder.addCase(deletarFrequencia.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletarFrequencia.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deletarFrequencia.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { fillEntity } = frequenciaSlice.actions;

export default frequenciaSlice.reducer;
