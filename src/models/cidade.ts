import { EstadoDTO } from "models/estado";
export interface CidadeDTO {
  id: number;
  nome: string;
  estado: EstadoDTO; // Corrija para ser EstadoDTO, não EstadoDTO[]
}
