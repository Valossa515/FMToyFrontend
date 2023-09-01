import { PedidoDTO } from "models/pedido";

export interface PagamentoDTO {
    id: number;
    estado: number;
    pedido: PedidoDTO;
  }
  