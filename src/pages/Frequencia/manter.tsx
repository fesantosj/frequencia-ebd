import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IFrequencia } from "@/interfaces/frequencia/frequenciaModel";
import {
  cadastrarFrequencia,
  atualizarFrequencia,
} from "@/request/frequenciaRequest";
import { listarClasses } from "@/request/classeRequest";
import { listarPessoaPorClasse } from "@/request/pessoaRequest";
import colors from "@/theme/colors";
import { Select, Input, Label, ContainerInput } from "@/Style";
import { IGenericItemModel } from "@/interfaces/genericItemModel";
import { IFrequenciaPessoa } from "@/interfaces/frequencia/frequenciaPessoaModel";
import { IPessoa } from "@/interfaces/pessoa/pessoaModel";
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SectionTitle = styled.h3`
  color: ${colors.secondary};
  margin-top: 15px;
  margin-bottom: 10px;
  font-size: 1.1em;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
`;

const ChamadaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ChamadaItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const StudentName = styled.span`
  font-size: 16px;
  color: ${colors.text};
`;

const ToggleContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${colors.primary};
  }

  &:focus + span {
    box-shadow: 0 0 1px ${colors.primary};
  }

  &:checked + span:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
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

const CompactContainerInput = styled(ContainerInput)`
  margin-bottom: 0;
`;

const CompactInput = styled(Input)`
  margin-bottom: 0;
`;

const CompactSelect = styled(Select)`
  margin-bottom: 0;
`;

export default function ManterFrequencia() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Redux State
  const classesState = useAppSelector((state) => state.classe);
  const pessoasState = useAppSelector((state) => state.pessoa);

  // Local State
  const [dataFrequencia, setDataFrequencia] = useState(
    moment().format("YYYY-MM-DD"),
  );
  const [idClasse, setIdClasse] = useState("");
  const [qtdBiblia, setQtdBiblia] = useState(0);
  const [qtdRevista, setQtdRevista] = useState(0);
  const [qtdVisitante, setQtdVisitante] = useState(0);
  const [totalOferta, setTotalOferta] = useState(0);

  // Lista de chamada com status de presença
  const [chamada, setChamada] = useState<IFrequenciaPessoa[]>([]);

  // Carregar dados iniciais
  useEffect(() => {
    dispatch(listarClasses());
  }, []);

  // Se for edição, carregar dados da frequência
  useEffect(() => {
    if (id && location.state?.frequencia) {
      const freq: IFrequencia = location.state.frequencia;
      setDataFrequencia(moment(freq.dataFrequencia).format("YYYY-MM-DD"));
      setIdClasse(freq.idClasse);
      setQtdBiblia(freq.qtdBiblia);
      setQtdRevista(freq.qtdRevista);
      setQtdVisitante(freq.qtdVisitante);
      setTotalOferta(freq.totalOferta);

      // Carregar alunos da classe para marcar a presença correta
      dispatch(listarPessoaPorClasse({ idClasse: freq.idClasse })).then(
        (action) => {
          if (listarPessoaPorClasse.fulfilled.match(action)) {
            const alunosDaClasse = action.payload.dados; // Assume payload returns { dados: IPessoa[] }

            // Mapear alunos e marcar presença se estiver na lista de freq.pessoas
            const listaChamada: IFrequenciaPessoa[] = alunosDaClasse.map(
              (aluno: IPessoa) => {
                const presente = freq.pessoas.some(
                  (p) => p.idPessoa === aluno.id,
                );
                return {
                  idPessoa: aluno.id!,
                  nome: aluno.nome, // Add 'nome' mainly for UI display if needed locally, though IFrequenciaPessoa definition might need check
                  isPresent: presente,
                };
              },
            );
            setChamada(listaChamada);
          }
        },
      );
    }
  }, [id, location.state]);

  // Quando mudar a classe (modo novo), carregar alunos
  const handleClasseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const novaClasseId = e.target.value;
    setIdClasse(novaClasseId);

    if (novaClasseId && !id) {
      // Só carrega se não estiver editando ou se explicitamente mudou a classe
      carregarAlunosClasse(novaClasseId);
    }
  };

  const carregarAlunosClasse = (classId: string) => {
    dispatch(listarPessoaPorClasse({ idClasse: classId }));
  };

  // Sincronizar lista de chamada quando a lista de pessoas do redux atualizar (apenas modo novo)
  useEffect(() => {
    if (!id && pessoasState.listagem.length > 0 && idClasse) {
      const novaChamada = pessoasState.listagem.map((aluno) => ({
        idPessoa: aluno.id!,
        // nome: aluno.nome, // We rely on people list order or ID matching usually.
        // Better to keep the student object or name for display.
        // Let's assume IFrequenciaPessoa extends minimal info or we map by index/ID in render.
        // Wait, IFrequenciaPessoa only has idPessoa and isPresent. We need the name to display!
        // Strategy: We will render using pessoasState.listagem, and interact with 'chamada' state.
        isPresent: false,
      }));
      setChamada(novaChamada);
    }
  }, [pessoasState.listagem, idClasse, id]);

  const togglePresenca = (idPessoa: string, checked: boolean) => {
    setChamada((prev) => {
      // Se já existe na lista, atualiza
      const existe = prev.find((p) => p.idPessoa === idPessoa);
      if (existe) {
        return prev.map((p) =>
          p.idPessoa === idPessoa ? { ...p, isPresent: checked } : p,
        );
      } else {
        // Se não existe (caso raro se sincronizado), adiciona
        return [...prev, { idPessoa, isPresent: checked }];
      }
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleOfertaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const onlyDigits = value.replace(/\D/g, "");
    const numberValue = Number(onlyDigits) / 100;
    setTotalOferta(numberValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: IFrequencia = {
      idClasse,
      dataFrequencia: new Date(dataFrequencia),
      qtdBiblia,
      qtdRevista,
      qtdVisitante,
      totalOferta,
      pessoas: chamada
        .filter((p) => p.isPresent)
        .map((p) => ({ idPessoa: p.idPessoa, isPresent: true })),
    };

    if (id) {
      payload.id = id;
      dispatch(atualizarFrequencia(payload)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/frequencias");
        }
      });
    } else {
      dispatch(cadastrarFrequencia(payload)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/frequencias");
        }
      });
    }
  };

  const renderChamadaList = (tipo: string) => {
    const pessoasFiltradas =
      pessoasState.listagem?.filter(
        (p) => p.tipo.toUpperCase() === tipo.toUpperCase(),
      ) || [];

    if (pessoasFiltradas.length === 0) {
      return (
        <p style={{ color: "#666", fontStyle: "italic", padding: 10 }}>
          Nenhum registro encontrado.
        </p>
      );
    }

    return pessoasFiltradas.map((pessoa) => {
      const status = chamada.find((c) => c.idPessoa === pessoa.id);
      const isChecked = status ? status.isPresent : false;

      return (
        <ChamadaItem
          key={pessoa.id}
          onClick={() => togglePresenca(pessoa.id!, !isChecked)}
        >
          <StudentName>{pessoa.nome}</StudentName>
          <ToggleContainer onClick={(e) => e.stopPropagation()}>
            <ToggleInput
              type="checkbox"
              checked={isChecked}
              readOnly
            />
            <ToggleSlider />
          </ToggleContainer>
        </ChamadaItem>
      );
    });
  };

  return (
    <Container>
      <Title>{id ? "Editar Frequência" : "Nova Frequência"}</Title>

      <Form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        <CompactContainerInput>
          <Label>Data</Label>
          <CompactInput
            type="date"
            value={dataFrequencia}
            onChange={(e) => setDataFrequencia(e.target.value)}
            required
          />
        </CompactContainerInput>

        <CompactContainerInput>
          <Label>Classe</Label>
          <CompactSelect
            value={idClasse}
            onChange={handleClasseChange}
            required
            disabled={!!id}
          >
            <option value="">Selecione uma classe</option>
            {classesState.listagem?.map((c: IGenericItemModel) => (
              <option key={c.id} value={c.id}>
                {c.descricao}
              </option>
            ))}
          </CompactSelect>
        </CompactContainerInput>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          <CompactContainerInput>
            <Label>Bíblias</Label>
            <CompactInput
              type="number"
              value={qtdBiblia}
              onChange={(e) => setQtdBiblia(Number(e.target.value))}
            />
          </CompactContainerInput>
          <CompactContainerInput>
            <Label>Revistas</Label>
            <CompactInput
              type="number"
              value={qtdRevista}
              onChange={(e) => setQtdRevista(Number(e.target.value))}
            />
          </CompactContainerInput>
          <CompactContainerInput>
            <Label>Visitantes</Label>
            <CompactInput
              type="number"
              value={qtdVisitante}
              onChange={(e) => setQtdVisitante(Number(e.target.value))}
            />
          </CompactContainerInput>
          <CompactContainerInput>
            <Label>Oferta (R$)</Label>
            <CompactInput
              type="text"
              value={formatCurrency(totalOferta)}
              onChange={handleOfertaChange}
            />
          </CompactContainerInput>
        </div>

        <SectionTitle>Alunos</SectionTitle>
        <ChamadaContainer>
          {idClasse ? (
            renderChamadaList("A")
          ) : (
            <p style={{ color: "#666", textAlign: "center" }}>
              Selecione uma classe.
            </p>
          )}
        </ChamadaContainer>

        <SectionTitle>Professores</SectionTitle>
        <ChamadaContainer>
          {idClasse ? (
            renderChamadaList("P")
          ) : (
            <p style={{ color: "#666", textAlign: "center" }}>
              Selecione uma classe.
            </p>
          )}
        </ChamadaContainer>

        <ButtonContainer>
          <Button
            type="button"
            secondary
            onClick={() => navigate("/frequencias")}
          >
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}
