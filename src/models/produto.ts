import { CategoriaDTO } from "models/categoria";
import { PedidoDTO } from "./pedido";

export interface ProdutoDTO {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
    categorias: CategoriaDTO[];
    pedidos: PedidoDTO[];
  }