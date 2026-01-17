import { combineReducers } from "redux";
import authReducer from "@/redux/slices/authSlice";
import globalReducer from "@/redux/slices/globalSlice";
import pessoaReducer from "@/redux/slices/pessoaSlice";
import classeReducer from "@/redux/slices/classeSlice";
import frequenciaReducer from "@/redux/slices/frequenciaSlice";
import relatorioReducer from "@/redux/slices/relatorioSlice";

const rootReducer: any = combineReducers({
  authentication: authReducer,
  global: globalReducer,
  pessoa: pessoaReducer,
  classe: classeReducer,
  frequencia: frequenciaReducer,
  relatorio: relatorioReducer,
});

export default rootReducer;
