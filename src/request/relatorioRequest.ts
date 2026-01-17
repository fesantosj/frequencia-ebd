import { createApiThunk, HttpMethod } from "@/utils/UseApi";

export const gerarRelatorioGeral = createApiThunk<
  { dataFrequencia: string },
  any
>("gerarRelatorioGeral", HttpMethod.GET, "/relatorio/geral");
