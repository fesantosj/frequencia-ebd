import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { carregarAuth } from "@/redux/slices/authSlice";
import ProtectedRoute from "./ProtectedRoute";

// Páginas
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import ListagemPessoas from "@/pages/Pessoa/listagem";
import ManterPessoa from "@/pages/Pessoa/manter";
import ListagemClasses from "@/pages/Classe/listagem";
import ManterClasse from "@/pages/Classe/manter";
import ListagemFrequencia from "@/pages/Frequencia/listagem";
import ManterFrequencia from "@/pages/Frequencia/manter";
import Relatorio from "@/pages/Relatorio";

function AppRoutes() {
  const dispatch = useAppDispatch();
  const isAutenticated = useAppSelector((state) => state.authentication.isAutenticated);

  useEffect(() => {
    dispatch(carregarAuth());
  }, [dispatch]);

  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/login" element={isAutenticated ? <Navigate to="/" replace /> : <Login />} />

      {/* Rotas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/alunos"
        element={
          <ProtectedRoute>
            <ListagemPessoas tipo="A" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/alunos/novo"
        element={
          <ProtectedRoute>
            <ManterPessoa tipo="A" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/alunos/editar/:id"
        element={
          <ProtectedRoute>
            <ManterPessoa tipo="A" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/professores"
        element={
          <ProtectedRoute>
            <ListagemPessoas tipo="P" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/professores/novo"
        element={
          <ProtectedRoute>
            <ManterPessoa tipo="P" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/professores/editar/:id"
        element={
          <ProtectedRoute>
            <ManterPessoa tipo="P" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/classes"
        element={
          <ProtectedRoute>
            <ListagemClasses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/classes/novo"
        element={
          <ProtectedRoute>
            <ManterClasse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/classes/editar/:id"
        element={
          <ProtectedRoute>
            <ManterClasse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/frequencias"
        element={
          <ProtectedRoute>
            <ListagemFrequencia />
          </ProtectedRoute>
        }
      />

      <Route
        path="/frequencias/novo"
        element={
          <ProtectedRoute>
            <ManterFrequencia />
          </ProtectedRoute>
        }
      />

      <Route
        path="/frequencias/editar/:id"
        element={
          <ProtectedRoute>
            <ManterFrequencia />
          </ProtectedRoute>
        }
      />

      <Route
        path="/relatorios"
        element={
          <ProtectedRoute>
            <Relatorio />
          </ProtectedRoute>
        }
      />

      {/* Rota padrão - redireciona para login ou home */}
      <Route path="*" element={<Navigate to={isAutenticated ? "/" : "/login"} replace />} />
    </Routes>
  );
}

export default AppRoutes;
