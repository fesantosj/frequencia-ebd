import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ItemListagem from "@/components/ItemListagem";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { listarClasses, deletarClasse } from "@/request/classeRequest";
import { IGenericItemModel } from "@/interfaces/genericItemModel";
import colors from "@/theme/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  flex: 1;
  padding: 10px;
  min-height: 100vh;
  background-color: ${colors.background};
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

const TextoBotaoAdd = styled.span`
  color: #ffffff;
  font-size: 20px;
  text-align: center;
`;

const Title = styled.h2`
  color: ${colors.primary};
  margin-bottom: 20px;
  text-align: center;
`;

const BackButton = styled.button`
  margin-top: 10px;
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  border: 1px solid ${colors.primary};
  background-color: transparent;
  color: ${colors.primary};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #e6f0fa;
  }
`;

export default function ListagemClasses() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Estado Global
  const classesState = useAppSelector((state) => state.classe);

  useEffect(() => {
    dispatch(listarClasses());
  }, []);

  const confirmarExclusao = (id: string) => {
    if (!id) return;

    if (window.confirm("Tem certeza que deseja excluir esta Classe?")) {
      dispatch(deletarClasse({ id })).then(() => {
        dispatch(listarClasses());
      });
    }
  };

  const editarClasse = (classe: IGenericItemModel) => {
    navigate(`/classes/editar/${classe.id}`, { state: { classe } });
  };

  const adicionarClasse = () => {
    navigate(`/classes/novo`);
  };

  return (
    <Container>
      <Title>Listagem de Classes</Title>

      <ListContainer>
        {classesState.listagem?.map((item: IGenericItemModel) => (
          <ItemListagem
            key={item.id}
            descricao={item.descricao}
            graphicItem={
              <FontAwesomeIcon
                icon={faUsers}
                size="lg"
                color={colors.primary}
              />
            }
            aoEditar={() => editarClasse(item)}
            aoDeletar={() => confirmarExclusao(item.id!)}
          />
        ))}
        {(!classesState.listagem || classesState.listagem.length === 0) && (
          <div style={{ textAlign: "center", color: "#666", marginTop: 20 }}>
            Nenhuma classe encontrada.
          </div>
        )}
      </ListContainer>

      <ContainerBotao style={{ flexDirection: "column", gap: "10px" }}>
        <BotaoAdd onClick={adicionarClasse}>
          <TextoBotaoAdd>Nova Classe</TextoBotaoAdd>
        </BotaoAdd>
        <BackButton onClick={() => navigate("/")}>Voltar</BackButton>
      </ContainerBotao>
    </Container>
  );
}
