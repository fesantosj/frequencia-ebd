import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ItemListagem from "@/components/ItemListagem";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IGenericItemModel } from "@/interfaces/genericItemModel";
import { IPessoa } from "@/interfaces/pessoa/pessoaModel";
import { listarClasses } from "@/request/classeRequest";
import {
  listarPessoaPorClasse,
  listarPessoas,
  deletarPessoa,
} from "@/request/pessoaRequest";
import colors from "@/theme/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Select, Input } from "@/Style";

interface ListagemPessoasProps {
  tipo: string;
}

const Container = styled.div`
  flex: 1;
  padding: 10px;
  min-height: 100vh;
  background-color: ${colors.background};
`;

const SubheaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.branco};
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  gap: 10px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ContainerBotao = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: 20px;
  flex-direction: column;
  gap: 10px;
`;

const BotaoAdd = styled.button`
  background-color: ${colors.primary};
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0256b8;
  }
`;

const BackButton = styled.button`
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  border: 1px solid ${colors.primary};
  background-color: transparent;
  color: ${colors.primary};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e6f0fa;
  }
`;

const TextoBotaoAdd = styled.span`
  color: #ffffff;
  font-size: 20px;
  text-align: center;
`;

export default function ListagemPessoas({ tipo }: ListagemPessoasProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Estado Global
  const classe = useAppSelector((state) => state.classe);
  const pessoa = useAppSelector((state) => state.pessoa);

  const [classeSelecionada, setClasseSelecionada] = useState<string | null>(
    null,
  );
  const [busca, setBusca] = useState("");

  useEffect(() => {
    dispatch(listarClasses());
  }, []);

  const listaFiltrada = useMemo(() => {
    let filtrados =
      pessoa.listagem?.filter(
        (item: IPessoa) => item.tipo.toUpperCase() === tipo.toUpperCase(),
      ) || [];

    if (busca) {
      filtrados = filtrados.filter((item: IPessoa) =>
        item.nome.toLowerCase().includes(busca.toLowerCase()),
      );
    }
    return filtrados;
  }, [pessoa.listagem, tipo, busca]);

  useEffect(() => {
    if (classeSelecionada) {
      dispatch(listarPessoaPorClasse({ idClasse: classeSelecionada }));
    } else {
      dispatch(listarPessoas());
    }
  }, [classeSelecionada]);

  const handleClasseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const itemValue = event.target.value;
    const novaClasse = itemValue === "todos" ? null : itemValue;
    setClasseSelecionada(novaClasse);
  };

  const confirmarExclusao = (id: string) => {
    if (!id) return;

    if (window.confirm("Tem certeza que deseja excluir esta Pessoa?")) {
      dispatch(deletarPessoa({ id })).then(() => {
        dispatch(listarPessoas());
      });
    }
  };

  const editarPessoa = (pessoa: IPessoa) => {
    const basePath = tipo === "A" ? "/alunos" : "/professores";
    navigate(`${basePath}/editar/${pessoa.id}`, { state: { pessoa } });
  };

  const adicionarPessoa = () => {
    const basePath = tipo === "A" ? "/alunos" : "/professores";
    navigate(`${basePath}/novo`);
  };

  return (
    <Container>
      <SubheaderContainer>
        <Input
          placeholder="Pesquisar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            marginBottom: 0,
            height: 45,
            width: "100%",
          }}
        />

        <Select
          value={classeSelecionada || "todos"}
          onChange={handleClasseChange}
          style={{ marginBottom: 0, height: 45, width: "100%" }}
        >
          <option value="todos">Todas as classes</option>
          {classe.listagem?.map((classe: IGenericItemModel) => (
            <option key={classe.id!.toString()} value={classe.id!.toString()}>
              {classe.descricao}
            </option>
          ))}
        </Select>
      </SubheaderContainer>

      <ListContainer>
        {listaFiltrada.map((item: IPessoa) => (
          <ItemListagem
            key={item.id!.toString()}
            descricao={item.nome}
            graphicItem={
              <FontAwesomeIcon icon={faUser} size="lg" color={colors.primary} />
            }
            aoEditar={() => editarPessoa(item)}
            aoDeletar={() => confirmarExclusao(item.id!)}
          />
        ))}
      </ListContainer>

      <ContainerBotao>
        <BotaoAdd onClick={adicionarPessoa}>
          <TextoBotaoAdd>Adicionar</TextoBotaoAdd>
        </BotaoAdd>
        <BackButton onClick={() => navigate("/")}>Voltar para Home</BackButton>
      </ContainerBotao>
    </Container>
  );
}
