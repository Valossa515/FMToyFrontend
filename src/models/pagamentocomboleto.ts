import { PagamentoDTO } from "./Pagamento";

export interface PagamentoComBoleto extends PagamentoDTO {
    dataVencimento: string;
    dataPagamento: string;
  }