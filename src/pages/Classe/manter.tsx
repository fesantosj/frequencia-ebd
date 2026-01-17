import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { cadastrarClasse, atualizarClasse } from "@/request/classeRequest";
import { IGenericItemModel } from "@/interfaces/genericItemModel";
import colors from "@/theme/colors";
import { Input, Label, ContainerInput } from "@/Style";

const Container = styled.div`
  flex: 1;
  padding: 20px;
  min-height: 100vh;
  background-color: ${colors.background};
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: ${colors.primary};
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 10px;
`;

const Button = styled.button<{ secondary?: boolean }>`
  flex: 1;
  padding: 15px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => (props.secondary ? "#ccc" : colors.primary)};
  color: ${(props) => (props.secondary ? "#333" : "white")};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export default function ManterClasse() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (id && location.state?.classe) {
      const classe: IGenericItemModel = location.state.classe;
      setDescricao(classe.descricao);
    }
  }, [id, location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: IGenericItemModel = {
      descricao,
    };

    if (id) {
      payload.id = id;
      dispatch(atualizarClasse(payload)).then((res) => {
        if (atualizarClasse.fulfilled.match(res)) {
          navigate("/classes");
        }
      });
    } else {
      dispatch(cadastrarClasse(payload)).then((res) => {
        if (cadastrarClasse.fulfilled.match(res)) {
          navigate("/classes");
        }
      });
    }
  };

  return (
    <Container>
      <Title>{id ? "Editar Classe" : "Nova Classe"}</Title>

      <Form onSubmit={handleSubmit}>
        <ContainerInput>
          <Label>Descrição</Label>
          <Input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Nome da Classe"
            required
          />
        </ContainerInput>

        <ButtonContainer>
          <Button type="button" secondary onClick={() => navigate("/classes")}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
