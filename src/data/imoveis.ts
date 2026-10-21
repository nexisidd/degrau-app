// Mocks do protótipo "Degrau — Protótipo do App". Valores sempre como números.
import { creditoMensal } from '@/lib/credito';
import type {
  AnuncioProprietario,
  Bairro,
  ContratoAtual,
  FaixaAluguel,
  Imovel,
  PerfilInteressado,
  Usuario,
} from './tipos';

export const usuario: Usuario = { nome: 'Caique', cidade: 'São Paulo' };

export const imoveis: Imovel[] = [
  {
    id: 'p1',
    tipo: 'Apartamento',
    bairro: 'Real Parque',
    rua: 'Rua Dom Paulo Pedrosa',
    aluguel: 3400,
    precoCompra: 520000,
    condominioIptu: 2070,
    m2: 80,
    quartos: 3,
    vagas: 2,
    fotos: [],
    totalFotos: 12,
    coordenadas: { lat: -23.6082, lng: -46.7105 },
  },
  {
    id: 'p2',
    tipo: 'Casa',
    bairro: 'Vila Morumbi',
    rua: 'Rua Américo Alves Pereira Filho',
    aluguel: 4200,
    precoCompra: 750000,
    condominioIptu: 152,
    m2: 140,
    quartos: 3,
    vagas: 1,
    fotos: [],
    totalFotos: 9,
    coordenadas: { lat: -23.6116, lng: -46.7031 },
  },
  {
    id: 'p3',
    tipo: 'Apartamento',
    bairro: 'Real Parque',
    rua: 'Av. Duquesa de Goiás',
    aluguel: 3900,
    precoCompra: 650000,
    condominioIptu: 1330,
    m2: 92,
    quartos: 3,
    vagas: 0,
    fotos: [],
    totalFotos: 10,
    coordenadas: { lat: -23.6166, lng: -46.7073 },
  },
  {
    id: 'p4',
    tipo: 'Apartamento',
    bairro: 'Morumbi',
    rua: 'Praça Beato Padre Ludovico Pavoni',
    aluguel: 4800,
    precoCompra: 857000,
    condominioIptu: 2499,
    m2: 133,
    quartos: 3,
    vagas: 2,
    fotos: [],
    totalFotos: 14,
    coordenadas: { lat: -23.6212, lng: -46.7041 },
  },
];

export const faixas: FaixaAluguel[] = [
  { label: 'Até R$ 3 mil', aluguelMinimo: 0, aluguelMaximo: 3000, aluguelReferencia: 2600, imovelMaximo: 400000 },
  { label: 'R$ 3 a 4,5 mil', aluguelMinimo: 3000, aluguelMaximo: 4500, aluguelReferencia: 3700, imovelMaximo: 650000 },
  { label: 'Mais de R$ 4,5 mil', aluguelMinimo: 4500, aluguelMaximo: Infinity, aluguelReferencia: 5200, imovelMaximo: 900000 },
];

export const bairros: Bairro[] = [
  { nome: 'Real Parque', quantidade: 12, tom: 'forest' },
  { nome: 'Morumbi', quantidade: 34, tom: 'forestRaised' },
  { nome: 'Vila Andrade', quantidade: 27, tom: 'mintSoft' },
];

export const perfisInteressados: PerfilInteressado[] = [
  { id: 'i1', resumo: 'Renda familiar de R$ 14 mil · tem R$ 40 mil guardados · quer mudar em até 60 dias', status: 'Pré-aprovado' },
  { id: 'i2', resumo: 'Renda de R$ 11 mil · usa o FGTS na compra · casal com 1 filho', status: 'Em análise' },
  { id: 'i3', resumo: 'Renda de R$ 18 mil · quer comprar em 24 meses', status: 'Em análise' },
];

export const anuncioProprietario: AnuncioProprietario = {
  endereco: 'Rua Barão de Melgaço, 42',
  aluguel: 4100,
  precoVenda: 690000,
  visualizacoes: 312,
  visitas: 6,
  interessados: 3,
};

const creditoDoMes = creditoMensal(imoveis[0].aluguel);

export const contratoAtual: ContratoAtual = {
  imovelId: 'p1',
  creditoAcumulado: 12400,
  opcaoAte: '2028-10-01',
  proximoVencimento: '2026-11-12',
  extrato: ['2026-10-01', '2026-09-01', '2026-08-01', '2026-07-01', '2026-06-01'].map((mes) => ({
    mes,
    valor: creditoDoMes,
    status: 'em dia' as const,
  })),
  mesesAnteriores: 7,
};
