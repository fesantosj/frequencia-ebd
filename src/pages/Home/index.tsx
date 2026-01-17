import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import {
  CardContainer,
  Card,
  TextoCard,
  StyledView,
  IconeCardButton,
  SubtituloHome,
} from "@/Style";
import colors from "@/theme/colors";
import {
  faChalkboardUser,
  faGraduationCap,
  faSchool,
  faClipboardList,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ContainerBotao = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 15px;
`;

const BotaoSair = styled.button`
  background-color: ${colors.primary};
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0256b8;
  }
`;

const TextoBotaoSair = styled.span`
  color: #ffffff;
  font-size: 16px;
`;

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleLogout(): void {
    dispatch(logout());
  }

  return (
    <StyledView>
      <SubtituloHome>Opções</SubtituloHome>
      <CardContainer>
        <Card onClick={() => navigate("/alunos")}>
          <IconeCardButton icon={faGraduationCap} />
          <TextoCard>Alunos</TextoCard>
        </Card>
        <Card onClick={() => navigate("/professores")}>
          <IconeCardButton icon={faChalkboardUser} />
          <TextoCard>Professores</TextoCard>
        </Card>
      </CardContainer>
      <CardContainer>
        <Card onClick={() => navigate("/classes")}>
          <IconeCardButton icon={faSchool} />
          <TextoCard>Classes</TextoCard>
        </Card>
        <Card onClick={() => navigate("/frequencias")}>
          <IconeCardButton icon={faClipboardList} />
          <TextoCard>Frequência</TextoCard>
        </Card>
      </CardContainer>
      <CardContainer style={{ paddingLeft: 15, paddingRight: 15 }}>
        <Card style={{ width: "100%" }} onClick={() => navigate("/relatorios")}>
          <IconeCardButton icon={faFileLines} />
          <TextoCard>Relatórios</TextoCard>
        </Card>
      </CardContainer>
      <ContainerBotao>
        <BotaoSair onClick={handleLogout}>
          <TextoBotaoSair>Sair</TextoBotaoSair>
        </BotaoSair>
      </ContainerBotao>
    </StyledView>
  );
}
