import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetAll } from "@/redux/actions/actions";
import { autenticar } from "@/request/autenticacaoRequest";
import {
  limparDadosAutenticacao,
  obterInfoAutenticacao,
  salvarInfoAutenticacao,
} from "@/utils/Storage";
import { jwtDecode, JwtPayload } from "jwt-decode";

export interface IAuthState {
  nomeUsuario: string;
  token: string;
  isAutenticated: boolean;
  loading: boolean;
}

const initialState: IAuthState = {
  nomeUsuario: "",
  token: "",
  isAutenticated: false,
  loading: false,
};

export const carregarAuth = createAsyncThunk(
  "carregar autenticacao",
  async (_, { rejectWithValue }) => {
    const data = await obterInfoAutenticacao();
    if (data) {
      return data;
    } else {
      return rejectWithValue("Nenhum dado encontrado");
    }
  },
);

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      state.isAutenticated = false;
      limparDadosAutenticacao();
    },
    login: (state) => {
      state.isAutenticated = true;
    },
  },
  extraReducers: (builder) => {
    //Resetar estado
    builder.addCase(resetAll, () => initialState);

    //autenticar usuario
    builder.addCase(autenticar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(autenticar.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.dados;
      const decoded = jwtDecode<JwtPayload>(action.payload.dados);
      if (decoded.exp && decoded.exp * 1000 > Date.now()) {
        salvarInfoAutenticacao(action.payload.dados);
        state.isAutenticated = true;
      }
    });
    builder.addCase(autenticar.rejected, (state) => {
      state.loading = false;
    });

    // Carregar estado salvo do AsyncStorage
    builder.addCase(carregarAuth.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isAutenticated = true;
    });
    builder.addCase(carregarAuth.rejected, (state) => {
      state.token = "";
      state.isAutenticated = false;
    });
  },
});

export const { logout, login } = authSlice.actions;

export default authSlice.reducer;
