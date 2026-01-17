import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ItemListagem from "@/components/ItemListagem";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IFrequencia } from "@/interfaces/frequencia/frequenciaModel";
import { IGenericItemModel } from "@/interfaces/genericItemModel";
import { listarClasses } from "@/request/classeRequest";
import {
  listarFrequencias,
  deletarFrequencia,
} from "@/request/frequenciaRequest";
import colors from "@/theme/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { Select, Input } from "@/Style";

const Container = styled.div`
  flex: 1;
  padding: 10px;
  min-height: 100vh;
  background-color: ${colors.background};
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: ${colors.branco};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  align-items: center;
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

const Title = styled.h2`
  color: ${colors.primary};
  margin-bottom: 20px;
  text-align: center;
`;

export default function ListagemFrequencia() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Estado Global
  const frequencia = useAppSelector((state) => state.frequencia);
  const classes = useAppSelector((state) => state.classe);

  // Filtros
  const [dataFiltro, setDataFiltro] = useState("");
  const [classeFiltro, setClasseFiltro] = useState("");

  const getNomeClasse = (idClasse: string) => {
    const classeEncontrada = classes.listagem?.find((c) => c.id === idClasse);
    return classeEncontrada ? classeEncontrada.descricao : "Classe removida";
  };

  useEffect(() => {
    dispatch(listarClasses());
    dispatch(listarFrequencias());
  }, []);

  const confirmarExclusao = (id: string) => {
    if (!id) return;

    if (window.confirm("Tem certeza que deseja excluir esta Frequência?")) {
      dispatch(deletarFrequencia({ id })).then(() => {
        dispatch(listarFrequencias());
      });
    }
  };

  const editarFrequencia = (frequencia: IFrequencia) => {
    navigate(`/frequencias/editar/${frequencia.id}`, { state: { frequencia } });
  };

  const adicionarFrequencia = () => {
    navigate(`/frequencias/novo`);
  };

  const listaFiltrada =
    frequencia.listagem?.filter((item) => {
      let matchData = true;
      let matchClasse = true;

      if (dataFiltro) {
        matchData =
          moment(item.dataFrequencia).format("YYYY-MM-DD") === dataFiltro;
      }

      if (classeFiltro) {
        matchClasse = item.idClasse === classeFiltro;
      }

      return matchData && matchClasse;
    }) || [];

  return (
    <Container>
      <Title>Listagem de Frequências</Title>

      <FilterContainer>
        <div style={{ flex: 1 }}>
          <Input
            type="date"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
            style={{ marginBottom: 0, height: 40 }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Select
            value={classeFiltro}
            onChange={(e) => setClasseFiltro(e.target.value)}
            style={{ marginBottom: 0, height: 40, width: "100%" }}
          >
            <option value="">Todas as Classes</option>
            {classes.listagem?.map((c: IGenericItemModel) => (
              <option key={c.id} value={c.id}>
                {c.descricao}
              </option>
            ))}
          </Select>
        </div>
      </FilterContainer>

      <ListContainer>
        {listaFiltrada.map((item) => (
          <ItemListagem
            key={item.id}
            descricao={`${moment(item.dataFrequencia).format("DD/MM/YYYY")} - ${getNomeClasse(item.idClasse)}`}
            graphicItem={
              <FontAwesomeIcon
                icon={faCalendarCheck}
                size="lg"
                color={colors.primary}
              />
            }
            aoEditar={() => editarFrequencia(item)}
            aoDeletar={() => confirmarExclusao(item.id!)}
          />
        ))}
        {listaFiltrada.length === 0 && (
          <div style={{ textAlign: "center", color: "#666", marginTop: 20 }}>
            Nenhuma frequência encontrada.
          </div>
        )}
      </ListContainer>

      <ContainerBotao>
        <BotaoAdd onClick={adicionarFrequencia}>
          <TextoBotaoAdd>Nova Frequência</TextoBotaoAdd>
        </BotaoAdd>
        <BackButton onClick={() => navigate("/")}>Voltar para Home</BackButton>
      </ContainerBotao>
    </Container>
  );
}
