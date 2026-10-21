// Ponto único de acesso aos dados. Hoje lê os mocks locais; na fase 2 passa a chamar o backend
// sem que as telas mudem.
import {
  anuncioProprietario,
  bairros,
  contratoAtual,
  faixas,
  imoveis,
  perfisInteressados,
  usuario,
} from './imoveis';
import type { FaixaAluguel, Imovel } from './tipos';

export const api = {
  usuario: () => usuario,
  imoveis: (): Imovel[] => imoveis,
  imovel: (id: string): Imovel | undefined => imoveis.find((i) => i.id === id),
  imoveisPorIds: (ids: string[]): Imovel[] => imoveis.filter((i) => ids.includes(i.id)),
  imoveisNaFaixa: (faixa: FaixaAluguel): Imovel[] =>
    imoveis.filter((i) => i.aluguel >= faixa.aluguelMinimo && i.aluguel < faixa.aluguelMaximo),
  faixas: (): FaixaAluguel[] => faixas,
  bairros: () => bairros,
  perfisInteressados: () => perfisInteressados,
  anuncioProprietario: () => anuncioProprietario,
  contratoAtual: () => contratoAtual,
};

export type { Imovel, FaixaAluguel } from './tipos';
