import { useState } from "react";
import styled from "styled-components";
import colors from "@/theme/colors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { autenticar } from "@/request/autenticacaoRequest";
import logoImage from "@/assets/AD_Logo.webp";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 32px;
  gap: 16px;
  background-color: ${colors.background};
`;

const Logo = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  gap: 15px;
`;

const Input = styled.input`
  height: 50px;
  width: 100%;
  border: 1px solid #a2a2a2;
  border-radius: 9px;
  padding: 0 10px;
  background-color: ${colors.branco};
  font-size: 16px;
  box-shadow: 0 2px 3.84px rgba(130, 130, 130, 0.25);

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const Button = styled.button`
  height: 50px;
  width: 100%;
  background-color: ${colors.primary};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0256b8;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ButtonText = styled.span`
  font-size: 22px;
  color: #ffffff;
`;

const Spinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${colors.primary};
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Login() {
  const dispatch = useAppDispatch();
  const loadingAuth: boolean = useAppSelector((state) => state.authentication.loading);

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (!usuario || !senha) {
      window.alert("Informe usuário e senha");
      return;
    }

    let result = await dispatch(autenticar({ usuario, senha }));

    if (!result.payload.sucesso) {
      window.alert(result.payload.mensagem);
    }
  }

  return (
    <Container>
      <Logo src={logoImage} alt="Logo Assembleia de Deus" />
      <Form onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button type="submit" disabled={loadingAuth}>
          {loadingAuth ? <Spinner /> : <ButtonText>Entrar</ButtonText>}
        </Button>
      </Form>
    </Container>
  );
}
