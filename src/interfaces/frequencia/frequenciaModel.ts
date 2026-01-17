import { IFrequenciaPessoa } from "./frequenciaPessoaModel";

export interface IFrequencia {
  id?: string;
  idClasse: string;
  dataFrequencia: Date | any;
  pessoas: IFrequenciaPessoa[];
  qtdBiblia: number;
  qtdRevista: number;
  qtdVisitante: number;
  totalOferta: number;
}
