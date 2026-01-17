import { IGenericItemModel } from "@/interfaces/genericItemModel";
import { createApiThunk, HttpMethod } from "@/utils/UseApi";

export const listarClasses = createApiThunk<void, any>(
  "listarClasse",
  HttpMethod.GET,
  "/classe",
);

export const cadastrarClasse = createApiThunk<IGenericItemModel, any>(
  "cadastrarClasse",
  HttpMethod.POST,
  "/classe",
);

export const atualizarClasse = createApiThunk<IGenericItemModel, any>(
  "atualizarClasse",
  HttpMethod.PUT,
  "/classe",
);

export const deletarClasse = createApiThunk<{ id: string }, any>(
  "deletarClasse",
  HttpMethod.DELETE,
  "/classe",
);
