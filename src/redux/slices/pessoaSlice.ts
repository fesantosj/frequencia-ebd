import { createSlice } from "@reduxjs/toolkit";
import { resetAll } from "../actions/actions";
import { IPessoa } from "@/interfaces/pessoa/pessoaModel";
import {
  cadastrarPessoa,
  listarPessoaPorClasse,
  listarPessoas,
  atualizarPessoa,
  deletarPessoa,
} from "@/request/pessoaRequest";

export interface PessoaState {
  loading: boolean;
  listagem: IPessoa[];
  entidade: IPessoa;
}

const initialState: PessoaState = {
  loading: false,
  listagem: [],
  entidade: {} as IPessoa,
};

const pessoaSlice = createSlice({
  name: "pessoa",
  initialState,
  reducers: {
    fillEntity: (state, action) => {
      state.entidade = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, () => initialState);

    //cadastrar
    builder.addCase(cadastrarPessoa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(cadastrarPessoa.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.sucesso) {
        alert(`Sucesso! ${action.payload.mensagem}`);
      } else {
        alert(`Erro! ${action.payload.mensagem}`);
      }
    });
    builder.addCase(cadastrarPessoa.rejected, (state) => {
      state.loading = false;
    });

    //listar
    builder.addCase(listarPessoaPorClasse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listarPessoaPorClasse.fulfilled, (state, action) => {
      state.listagem = action.payload.dados;
      state.loading = false;
    });
    builder.addCase(listarPessoaPorClasse.rejected, (state) => {
      state.loading = false;
    });

    //listar
    builder.addCase(listarPessoas.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listarPessoas.fulfilled, (state, action) => {
      state.listagem = action.payload.dados;
      state.loading = false;
    });
    builder.addCase(listarPessoas.rejected, (state) => {
      state.loading = false;
    });

    //atualizar
    builder.addCase(atualizarPessoa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(atualizarPessoa.fulfilled, (state, action) => {
      state.listagem = action.payload.dados;
      if (action.payload.sucesso) {
        alert(`Sucesso! ${action.payload.mensagem}`);
      } else {
        alert(`Erro! ${action.payload.mensagem}`);
      }

      state.loading = false;
    });
    builder.addCase(atualizarPessoa.rejected, (state) => {
      state.loading = false;
    });

    //deletar
    builder.addCase(deletarPessoa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletarPessoa.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deletarPessoa.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { fillEntity } = pessoaSlice.actions;

export default pessoaSlice.reducer;
