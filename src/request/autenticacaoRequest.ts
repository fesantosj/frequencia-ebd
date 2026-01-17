import { createApiThunk, HttpMethod } from "@/utils/UseApi";
import { IResponseModel } from "@/interfaces/IResponseModel";

export const autenticar = createApiThunk<
  { usuario: string; senha: string },
  IResponseModel
>("/autenticacao/autenticar", HttpMethod.POST, "/autenticacao/autenticar");
