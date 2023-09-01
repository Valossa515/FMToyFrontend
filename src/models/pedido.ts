import { ClienteDTO } from "models/cliente";
import { EnderecoDTO } from "models/endereco";
import { ItemPedidoDTO } from "models/itempedido";
import { PagamentoComCartao } from "models/pagamentocomcartao";
import { PagamentoComBoleto } from "models/pagamentocomboleto";

export interface PedidoDTO {
    id: number;
    instante: Date;
    pagamento: PagamentoComCartao | PagamentoComBoleto;
    cliente: ClienteDTO;
    endereco: EnderecoDTO;
    itens: ItemPedidoDTO[];
  }