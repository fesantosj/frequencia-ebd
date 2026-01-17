import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

export const salvarInfoAutenticacao = async (token: string) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Erro ao salvar dados de autenticação:", error);
  }
};

interface JwtPayload {
  exp: number;
}

export const obterInfoAutenticacao = async () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token && (await validarToken(token))) {
      return { token };
    } else {
      console.warn("Token inválido ou expirado");
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
  } catch (error) {
    console.error("Erro ao carregar dados de autenticação:", error);
    return null;
  }
};

export const limparDadosAutenticacao = async () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Erro ao limpar dados de autenticação:", error);
  }
};

export const validarToken = async (token: string): Promise<boolean> => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp && decoded.exp * 1000 > Date.now()) {
      await salvarInfoAutenticacao(token);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Erro ao validar o token:", error);
    return false;
  }
};
