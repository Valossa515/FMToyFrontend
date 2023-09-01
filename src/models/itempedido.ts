import { ProdutoDTO } from 'models/produto';
import { PedidoDTO } from 'models/pedido';

export interface ItemPedidoDTO {
  id: {
    pedido: PedidoDTO;
    produtos: ProdutoDTO;
  };
  desconto: number;
  quantidade: number;
  preco: number;
}