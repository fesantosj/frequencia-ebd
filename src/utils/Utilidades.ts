export function fileParaBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64String = reader.result?.toString().split(",")[1];
      if (base64String) {
        resolve(base64String);
      } else {
        reject("Erro ao converter arquivo para Base64");
      }
    };

    reader.onerror = () => {
      reject("Erro ao ler arquivo");
    };
  });
}

// Função para converter o arquivo em dados binários (ArrayBuffer)
export function fileParaBinary(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      const binaryData = reader.result as ArrayBuffer;
      resolve(binaryData);
    };

    reader.onerror = () => {
      reject("Erro ao ler arquivo");
    };
  });
}

export function base64ParaBinary(base64String: string) {
  const binaryString = window.atob(base64String);
  const byteArray = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }

  return byteArray;
}

export function base64paraImagem(base64: string): File {
  const data = base64.replace("data:image/", "").replace(";base64,", "");
  const file = new File([data], "image.png");
  return file;
}

export function removerPrefixoSrcBase64(base64String: string) {
  const prefix = "data:image/png;base64,";
  if (base64String.startsWith(prefix)) {
    return base64String.substr(prefix.length);
  }
  return base64String;
}

/*
  export function base64ParaBlob(base64: string): Blob {
    const data = base64.replace('data:image/', '').replace(';base64,', '');
    const bytes = Uint8Array.from(atob(data), (c) => Number(c));
    return new Blob([bytes], { type: 'image/png' });
  }*/

/**
 * Esta função retorna uma promisse do tipo Blob a partir de um Base64.
 *
 * @param {string}  base64String - A string base64 que será convertida.
 * @param {number} contentType - O tipo do arquivo que está sendo contido no base64. Ex: "application/pdf".
 * @returns {Blob} O Blob gerado.
 */
export async function base64ParaBlob(base64String: string, contentType: string): Promise<Blob> {
  const byteCharacters = atob(base64String);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

export function criarCaminhoBlob(blob: Blob): string {
  return URL.createObjectURL(blob);
}

// Função para pegar o primeiro dia do mês
export function obterPrimeiroDiaMesAtual() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

// Função para pegar o último dia do mês
export function obterUltimoDiaMesAtual() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function ajustarHoraInicioDia(data: Date | null): Date | null {
  if (!data) return null;
  const inicio = new Date(data);
  inicio.setHours(0, 0, 0, 0);
  return inicio;
}

// Método para ajustar a hora para o fim do dia
export function ajustarHoraFimDia(data: Date | null): Date | null {
  if (!data) return null;
  const fim = new Date(data);
  fim.setHours(23, 59, 59, 999);
  return fim;
}

export function parseDataLocal(data: string): Date {
  const [ano, mes, dia] = data.split("-").map(Number); // formato yyyy-mm-dd
  return new Date(ano, mes - 1, dia); // Mês começa em 0
}

export function formatarDataBr(data: Date | string): string {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function converterDataBrParaFormatoISO(dataBR: string): string {
  const [dia, mes, ano] = dataBR.split("/");
  return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
}

export function normalizarData(data: string | Date | undefined | null): Date | null {
  if (!data) return null;

  try {
    if (typeof data === "string") {
      const [ano, mes, dia] = data.split("-").map(Number);
      return new Date(ano, mes - 1, dia);
    } else {
      return new Date(data.getFullYear(), data.getMonth(), data.getDate());
    }
  } catch (e) {
    console.error("Erro ao normalizar data:", data, e);
    return null;
  }
}

/**
 * Formata número/string para padrão monetário brasileiro (sempre duas casas decimais)
 */
export const formatToBRL = (value: string | number): string => {
  if (value === null || value === undefined || value === "") return "0,00";

  let str = String(value).trim();

  if (/^\d+(\.\d+)?$/.test(str)) {
    return parseFloat(str).toFixed(2).replace(".", ",");
  }

  const numeric = str.replace(/\D/g, "");
  if (numeric.length === 0) return "0,00";

  return (Number(numeric) / 100).toFixed(2).replace(".", ",");
};

/**
 * Converte valor brasileiro formatado ("2,34") para número JS (2.34)
 * Ideal para enviar ao backend
 */
export const parseFromBRL = (value: string | number): number => {
  if (!value) return 0;

  return parseFloat(String(value).replace(/\./g, "").replace(",", "."));
};
