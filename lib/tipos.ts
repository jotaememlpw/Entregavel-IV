export type Categoria = {
  id: number;
  user_id: string;
  nome: string;
};

export type Gasto = {
  id: number;
  user_id: string;
  categoria_id: number | null;
  descricao: string;
  valor: number;
  data: string;
};

export type Orcamento = {
  id: number;
  user_id: string;
  categoria_id: number;
  limite: number;
  mes: string;
};

export type Resultado = {
  sucesso: boolean;
  mensagem: string;
};