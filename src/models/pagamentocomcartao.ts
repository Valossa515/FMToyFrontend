import { PagamentoDTO } from "models/Pagamento";

export interface PagamentoComCartao extends PagamentoDTO {
    numeroDeParcelas: number;
    numeroDoCartao: string;
    cvv: string;
    dataValidade: string; 
  }
  