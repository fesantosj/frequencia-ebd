import { createSlice } from "@reduxjs/toolkit";
import { resetAll } from "../actions/actions";
import {
  atualizarClasse,
  cadastrarClasse,
  deletarClasse,
  listarClasses,
} from "@/request/classeRequest";
import { IGenericItemModel } from "@/interfaces/genericItemModel";

export interface ClasseState {
  loading: boolean;
  listagem: IGenericItemModel[];
  entidade: IGenericItemModel;
}

const initialState: ClasseState = {
  loading: false,
  listagem: [],
  entidade: {} as IGenericItemModel,
};

const classeSlice = createSlice({
  name: "classe",
  initialState,
  reducers: {
    fillEntity: (state, action) => {
      state.entidade = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, () => initialState);

    //cadastrar
    builder.addCase(cadastrarClasse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(cadastrarClasse.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.sucesso) {
        alert(`Sucesso! ${action.payload.mensagem}`);
      } else {
        alert(`Erro! ${action.payload.mensagem}`);
      }
    });
    builder.addCase(cadastrarClasse.rejected, (state) => {
      state.loading = false;
    });

    //listar
    builder.addCase(listarClasses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listarClasses.fulfilled, (state, action) => {
      state.listagem = action.payload.dados;
      state.loading = false;
    });
    builder.addCase(listarClasses.rejected, (state) => {
      state.loading = false;
    });

    //atualizar
    builder.addCase(atualizarClasse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(atualizarClasse.fulfilled, (state, action) => {
      state.listagem = action.payload.dados;
      if (action.payload.sucesso) {
        alert(`Sucesso! ${action.payload.mensagem}`);
      } else {
        alert(`Erro! ${action.payload.mensagem}`);
      }

      state.loading = false;
    });
    builder.addCase(atualizarClasse.rejected, (state) => {
      state.loading = false;
    });

    //deletar
    builder.addCase(deletarClasse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletarClasse.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deletarClasse.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { fillEntity } = classeSlice.actions;

export default classeSlice.reducer;
