import { IFrequencia } from "@/interfaces/frequencia/frequenciaModel";
import { createApiThunk, HttpMethod } from "@/utils/UseApi";

export const listarFrequencias = createApiThunk<void, any>(
  "/frequencia",
  HttpMethod.GET,
  "/frequencia",
);

export const cadastrarFrequencia = createApiThunk<IFrequencia, any>(
  "cadastrarFrequencia",
  HttpMethod.POST,
  "/frequencia",
);

export const atualizarFrequencia = createApiThunk<IFrequencia, any>(
  "atualizarFrequencia",
  HttpMethod.PUT,
  "/frequencia",
);

export const deletarFrequencia = createApiThunk<{ id: Number }, any>(
  "deletarFrequencia",
  HttpMethod.DELETE,
  "/frequencia",
);
