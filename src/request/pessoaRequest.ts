import { IPessoa } from "@/interfaces/pessoa/pessoaModel";
import { createApiThunk, HttpMethod } from "@/utils/UseApi";

export const listarPessoaPorClasse = createApiThunk<{ idClasse: string }, any>(
  "/pessoaPorClasse",
  HttpMethod.GET,
  "/pessoa",
);

export const listarPessoas = createApiThunk<void, any>(
  "/pessoas",
  HttpMethod.GET,
  "/pessoa/todos",
);

export const cadastrarPessoa = createApiThunk<IPessoa, any>(
  "cadastrarPessoa",
  HttpMethod.POST,
  "/pessoa",
);

export const atualizarPessoa = createApiThunk<IPessoa, any>(
  "atualizarPessoa",
  HttpMethod.PUT,
  "/pessoa",
);

export const deletarPessoa = createApiThunk<{ id: string }, any>(
  "deletarPessoa",
  HttpMethod.DELETE,
  "/pessoa",
);
