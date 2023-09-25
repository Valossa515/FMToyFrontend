export type ClienteDTO  = {
  id?: number;
  nome: string;
  email?: string;
  cpfOuCnpj: string;
  senha?: string;
  username?: string;
  telefone1: string; 
  telefone2?: string; 
  telefone3?: string;
  tipo: number;
}