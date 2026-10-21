export type TipoImovel = 'Apartamento' | 'Casa';

export interface Imovel {
  id: string;
  tipo: TipoImovel;
  bairro: string;
  rua: string;
  /** R$/mês */
  aluguel: number;
  /** Travado no contrato. */
  precoCompra: number;
  condominioIptu: number;
  m2: number;
  quartos: number;
  vagas: number;
  /** Vazio no MVP: as telas usam placeholder. */
  fotos: string[];
  totalFotos: number;
  coordenadas: { lat: number; lng: number };
}

export interface FaixaAluguel {
  label: string;
  aluguelMinimo: number;
  aluguelMaximo: number;
  aluguelReferencia: number;
  imovelMaximo: number;
}

export interface Bairro {
  nome: string;
  quantidade: number;
  tom: 'forest' | 'forestRaised' | 'mintSoft';
}

export interface PerfilInteressado {
  id: string;
  /** Renda, reserva e prazo, sem nome. */
  resumo: string;
  status: 'Pré-aprovado' | 'Em análise';
}

export interface ContratoAtual {
  imovelId: string;
  creditoAcumulado: number;
  opcaoAte: string;
  proximoVencimento: string;
  extrato: { mes: string; valor: number; status: 'em dia' | 'atrasado' }[];
  mesesAnteriores: number;
}

export interface AnuncioProprietario {
  endereco: string;
  aluguel: number;
  precoVenda: number;
  visualizacoes: number;
  visitas: number;
  interessados: number;
}

export interface Usuario {
  nome: string;
  cidade: string;
}
