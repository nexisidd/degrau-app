// Regras de negócio do crédito para a entrada. Funções puras: as telas nunca calculam sozinhas.
// Percentuais e prazos vêm do protótipo e ainda precisam ser confirmados no modelo comercial.

/** Parte de cada aluguel que vira crédito para a entrada. */
export const PERCENTUAL_CREDITO = 0.3;
/** Entrada exigida, como fração do preço de compra. */
export const PERCENTUAL_ENTRADA = 0.2;
/** Prazos oferecidos no detalhe do imóvel, em meses. */
export const PRAZOS = [24, 30, 36] as const;
export type Prazo = (typeof PRAZOS)[number];
export const PRAZO_PADRAO: Prazo = 30;
/** Validade máxima da opção de compra, em meses. */
export const PRAZO_MAXIMO_OPCAO = 36;
/** Prazo de resposta do proprietário a uma proposta, em horas. */
export const PRAZO_RESPOSTA_HORAS = 48;

export function creditoMensal(aluguel: number): number {
  return aluguel * PERCENTUAL_CREDITO;
}

export function creditoAcumulado(aluguel: number, meses: number): number {
  return creditoMensal(aluguel) * meses;
}

export function metaEntrada(preco: number): number {
  return preco * PERCENTUAL_ENTRADA;
}

/** Progresso do crédito até a meta de entrada, em % inteiro de 0 a 100. */
export function progressoEntrada(credito: number, preco: number): number {
  const meta = metaEntrada(preco);
  if (meta <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((credito / meta) * 100)));
}

/** Quanto do preço do imóvel o crédito já cobre, em % com uma casa decimal. */
export function percentualDoImovel(credito: number, preco: number): number {
  if (preco <= 0) return 0;
  return Math.round((credito / preco) * 1000) / 10;
}
