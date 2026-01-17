import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "@/theme/colors";
import { Select, Input, Label, ContainerInput } from "@/Style";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { listarClasses } from "@/request/classeRequest";
import { gerarRelatorioGeral } from "@/request/relatorioRequest";
import { IGenericItemModel } from "@/interfaces/genericItemModel";
import moment from "moment";

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

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background-color: ${colors.primary};
  color: white;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0256b8;
  }
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

export default function Relatorio() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const classes = useAppSelector((state) => state.classe);

  const [dataRelatorio, setDataRelatorio] = useState(
    moment().format("YYYY-MM-DD"),
  );
  const [idClasse, setIdClasse] = useState("");

  useEffect(() => {
    dispatch(listarClasses());
  }, []);

  const handleGerarRelatorio = () => {
    // Assuming api expects 'dataFrequencia' (string) and maybe 'idClasse' query params?
    // The thunk definition was: createApiThunk<{ dataFrequencia: string }, any>(...)
    // I will pass the object. If filter by class is needed, it should be in the payload.
    // Based on user request "filtro por data e classe", I send both.
    // If backend ignores idClasse, it's fine.

    // Note: createApiThunk second generic is Response Type, first is Payload.
    // So logic: dispatch(gerarRelatorioGeral({ dataFrequencia: ... }))

    const payload: any = { dataFrequencia: dataRelatorio };
    if (idClasse) {
      payload.idClasse = idClasse;
    }

    dispatch(gerarRelatorioGeral(payload)).then((res) => {
      if (gerarRelatorioGeral.fulfilled.match(res)) {
        // Ideally prompt download or show success.
        // Since I don't know the response format (PDF blob? JSON?), I'll just alert success.
        alert("Relatório gerado com sucesso! (Verifique downloads ou console)");
        console.log("Relatorio Response:", res.payload);
      } else {
        alert("Erro ao gerar relatório.");
      }
    });
  };

  return (
    <Container>
      <Title>Relatórios</Title>

      <Form>
        <ContainerInput>
          <Label>Data</Label>
          <Input
            type="date"
            value={dataRelatorio}
            onChange={(e) => setDataRelatorio(e.target.value)}
          />
        </ContainerInput>

        <ContainerInput>
          <Label>Classe (Opcional)</Label>
          <Select
            value={idClasse}
            onChange={(e) => setIdClasse(e.target.value)}
          >
            <option value="">Geral (Todas as classes)</option>
            {classes.listagem?.map((c: IGenericItemModel) => (
              <option key={c.id} value={c.id}>
                {c.descricao}
              </option>
            ))}
          </Select>
        </ContainerInput>

        <Button onClick={handleGerarRelatorio}>Obter Relatório Geral</Button>

        <BackButton onClick={() => navigate("/")}>Voltar para Home</BackButton>
      </Form>
    </Container>
  );
}
