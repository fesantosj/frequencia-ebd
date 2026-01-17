import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";
import { obterInfoAutenticacao } from "./Storage";
import { IResponseModel } from "@/interfaces/IResponseModel";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await obterInfoAutenticacao();

    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}

/**
 * Cria um thunk assíncrono para interagir com uma API usando Redux Toolkit.
 *
 * @template ParamsType Tipo dos parâmetros da requisição (use `void` se não houver).
 * @template ResponseType Tipo da resposta da API.
 * @returns {AsyncThunk<ResponseType, ParamsType, {}>} Thunk assíncrono configurado.
 *
 */
export const createApiThunk = <ParamsType, ResponseType>(
  actionName: string,
  method: HttpMethod,
  url: string,
) => {
  return createAsyncThunk<
    ResponseType,
    ParamsType,
    { rejectValue: IResponseModel | any }
  >(actionName, async (args, { rejectWithValue }) => {
    try {
      let response;

      // Tratamento para diferentes métodos HTTP
      switch (method) {
        case HttpMethod.GET:
          response = await api.get(url, { params: args });
          break;
        case HttpMethod.POST:
          response = await api.post(url, args);
          break;
        case HttpMethod.PUT:
          if (!args || typeof args !== "object" || !("id" in args)) {
            throw new Error("ID obrigatório para requisições PUT.");
          }
          response = await api.put(`${url}?id=${args.id}`, args);
          break;
        case HttpMethod.DELETE:
          response = await api.delete(url, { params: args });
          break;
        case HttpMethod.PATCH:
          response = await api.patch(url, args);
          break;
        default:
          throw new Error("Método HTTP não suportado");
      }
      //VERIFICAR COMO ESTA O RETORNO NA API
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || {
          sucesso: false,
          mensagem: "Erro desconhecido",
          dados: null,
        },
      );
    }
  });
};
