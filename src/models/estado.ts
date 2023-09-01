import { CidadeDTO } from "models/cidade";

export interface EstadoDTO {
    id: number;
    nome: string;
    cidades: CidadeDTO[];
  }