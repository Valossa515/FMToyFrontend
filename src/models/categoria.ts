import { ProdutoDTO } from "models/produto";

export interface CategoriaDTO {
    id: number;
    nome: string;
    produtos: ProdutoDTO[];
  }