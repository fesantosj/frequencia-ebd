import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { cadastrarPessoa, atualizarPessoa } from "@/request/pessoaRequest";
import { listarClasses } from "@/request/classeRequest";
import colors from "@/theme/colors";
import { Select, Input, Label, ContainerInput } from "@/Style";
import { IGenericItemModel } from "@/interfaces/genericItemModel";
import { IPessoa } from "@/interfaces/pessoa/pessoaModel";
import moment from "moment";

interface ManterPessoaProps {
  tipo: string;
}

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

export default function ManterPessoa({ tipo }: ManterPessoaProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const tipoPessoaLabel = tipo === "A" ? "Aluno" : "Professor";
  const basePath = tipo === "A" ? "/alunos" : "/professores";

  // Redux
  const classesState = useAppSelector((state) => state.classe);

  // Local State
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [idClasse, setIdClasse] = useState("");

  useEffect(() => {
    dispatch(listarClasses());
  }, []);

  useEffect(() => {
    if (id && location.state?.pessoa) {
      const pessoa: IPessoa = location.state.pessoa;
      setNome(pessoa.nome);
      setDataNascimento(moment(pessoa.dataNascimento).format("YYYY-MM-DD"));
      setIdClasse(pessoa.idClasse);
    }
  }, [id, location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: IPessoa = {
      nome,
      dataNascimento: new Date(dataNascimento),
      tipo,
      idClasse,
    };

    if (id) {
      payload.id = id;
      dispatch(atualizarPessoa(payload)).then((res) => {
        if (atualizarPessoa.fulfilled.match(res)) {
          navigate(basePath);
        }
      });
    } else {
      dispatch(cadastrarPessoa(payload)).then((res) => {
        if (cadastrarPessoa.fulfilled.match(res)) {
          navigate(basePath);
        }
      });
    }
  };

  return (
    <Container>
      <Title>
        {id ? `Editar ${tipoPessoaLabel}` : `Novo ${tipoPessoaLabel}`}
      </Title>

      <Form onSubmit={handleSubmit}>
        <ContainerInput>
          <Label>Nome</Label>
          <Input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder={`Nome do ${tipoPessoaLabel}`}
            required
          />
        </ContainerInput>

        <ContainerInput>
          <Label>Data de Nascimento</Label>
          <Input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </ContainerInput>

        <ContainerInput>
          <Label>Classe</Label>
          <Select
            value={idClasse}
            onChange={(e) => setIdClasse(e.target.value)}
            required
          >
            <option value="">Selecione uma classe</option>
            {classesState.listagem?.map((c: IGenericItemModel) => (
              <option key={c.id} value={c.id}>
                {c.descricao}
              </option>
            ))}
          </Select>
        </ContainerInput>

        <ButtonContainer>
          <Button type="button" secondary onClick={() => navigate(basePath)}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
