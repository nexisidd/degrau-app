// Formatação para a tela. Os dados guardam números; o texto só nasce aqui.

const moeda = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

const decimal = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });
const percentual = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 });

const MESES_CURTOS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

// Espaço não separável: "R$ 3.400" e "R$ 520 mil" nunca quebram no meio da linha.
const NBSP = '\u00A0';
const normalizarEspaco = (texto: string) => texto.replace(/[ \u202F]/g, NBSP);

/** R$ 3.400 */
export function formatarMoeda(valor: number): string {
  return normalizarEspaco(moeda.format(Math.round(valor)));
}

/** R$ 520 mil, R$ 3,4 mil, R$ 1,2 mi. Usado em selos e pinos. */
export function formatarMoedaCurta(valor: number): string {
  if (Math.abs(valor) >= 1_000_000) return normalizarEspaco(`R$ ${decimal.format(valor / 1_000_000)} mi`);
  if (Math.abs(valor) >= 1_000) return normalizarEspaco(`R$ ${decimal.format(valor / 1_000)} mil`);
  return formatarMoeda(valor);
}

/** 5,8% */
export function formatarPercentual(valor: number): string {
  return `${percentual.format(valor)}%`;
}

export function formatarVagas(vagas: number): string {
  if (vagas === 0) return 'sem vaga';
  return vagas === 1 ? '1 vaga' : `${vagas} vagas`;
}

const lerData = (iso: string) => {
  const [ano, mes, dia] = iso.split('-').map(Number);
  return { ano, mes: mes - 1, dia: dia || 1 };
};

/** out/2028 */
export function formatarMesAno(iso: string): string {
  const { ano, mes } = lerData(iso);
  return `${MESES_CURTOS[mes]}/${ano}`;
}

/** Outubro de 2026 */
export function formatarMesPorExtenso(iso: string): string {
  const { ano, mes } = lerData(iso);
  const nome = MESES[mes];
  return `${nome.charAt(0).toUpperCase()}${nome.slice(1)} de ${ano}`;
}

/** 12/nov */
export function formatarDiaMes(iso: string): string {
  const { mes, dia } = lerData(iso);
  return `${dia}/${MESES_CURTOS[mes]}`;
}

/** Meses inteiros entre duas datas ISO (AAAA-MM-DD), nunca negativo. */
export function mesesEntre(inicioIso: string, fimIso: string): number {
  const a = lerData(inicioIso);
  const b = lerData(fimIso);
  return Math.max(0, (b.ano - a.ano) * 12 + (b.mes - a.mes));
}

export function hojeIso(agora: Date = new Date()): string {
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  return `${agora.getFullYear()}-${mes}-${dia}`;
}
