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
import { base64ParaBlob, criarCaminhoBlob } from "@/utils/Utilidades";

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
  const [base64PDF, setBase64PDF] = useState<string | null>(null);

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

    dispatch(gerarRelatorioGeral(payload)).then((res: any) => {
      console.log("Relatório API Response (full):", res);
      if (gerarRelatorioGeral.fulfilled.match(res)) {
        if (res.payload) {
          // Extração robusta do base64
          // Prioridade para: relatorioBase64 (confirmado pelo usuário), depois dados, data ou o próprio payload
          const extracted =
            res.payload.relatorioBase64 ||
            res.payload?.dados ||
            res.payload?.data ||
            res.payload;
          const base64 = typeof extracted === "string" ? extracted : "";

          if (base64) {
            setBase64PDF(base64);
            alert(
              "Relatório gerado com sucesso! Clique no botão vermelho para baixar o PDF.",
            );
          } else {
            console.error(
              "Payload não contém relatorioBase64 ou string válida:",
              res.payload,
            );
            alert(
              "Erro: O retorno do servidor não contém o relatório (formato inválido).",
            );
          }
        } else {
          alert("Erro: O servidor retornou resposta vazia.");
        }
      } else {
        alert("Erro ao gerar relatório.");
      }
    });
  };

  const handleDownloadPDF = async () => {
    if (!base64PDF) return;

    try {
      const blob = await base64ParaBlob(base64PDF, "application/pdf");
      const url = criarCaminhoBlob(blob);
      const downloadLink = document.createElement("a");
      const fileName = `Relatorio_Geral_${moment(dataRelatorio).format("DD_MM_YYYY")}.pdf`;

      downloadLink.href = url;
      downloadLink.download = fileName;
      downloadLink.click();

      // Clean up the URL object
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error("Erro ao fazer download do PDF:", error);
      alert("Erro ao processar o download do PDF.");
    }
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

        {base64PDF && (
          <Button
            onClick={handleDownloadPDF}
            style={{ backgroundColor: "#d32f2f", marginTop: "10px" }}
          >
            Fazer Download PDF
          </Button>
        )}

        <BackButton onClick={() => navigate("/")}>Voltar para Home</BackButton>
      </Form>
    </Container>
  );
}
