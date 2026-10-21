import {
  formatarDiaMes,
  formatarMesAno,
  formatarMesPorExtenso,
  formatarMoeda as moeda,
  formatarMoedaCurta as moedaCurta,
  formatarPercentual,
  formatarVagas,
  mesesEntre,
} from '../formato';

// Os valores usam espaço não separável; nos casos abaixo comparamos com espaço comum.
const formatarMoeda = (v: number) => moeda(v).replace(/\u00A0/g, ' ');
const formatarMoedaCurta = (v: number) => moedaCurta(v).replace(/\u00A0/g, ' ');

describe('formato', () => {
  it('usa espaço não separável para o valor não quebrar', () => {
    expect(moeda(3400)).toBe('R$\u00A03.400');
    expect(moedaCurta(520000)).toBe('R$\u00A0520\u00A0mil');
  });

  it('formata reais sem centavos', () => {
    expect(formatarMoeda(3400)).toBe('R$ 3.400');
    expect(formatarMoeda(520000)).toBe('R$ 520.000');
    expect(formatarMoeda(1020)).toBe('R$ 1.020');
  });

  it('formata valores curtos para selos e pinos', () => {
    expect(formatarMoedaCurta(520000)).toBe('R$ 520 mil');
    expect(formatarMoedaCurta(3400)).toBe('R$ 3,4 mil');
    expect(formatarMoedaCurta(4000)).toBe('R$ 4 mil');
    expect(formatarMoedaCurta(1200000)).toBe('R$ 1,2 mi');
  });

  it('formata percentual com vírgula', () => {
    expect(formatarPercentual(5.9)).toBe('5,9%');
  });

  it('descreve vagas', () => {
    expect(formatarVagas(0)).toBe('sem vaga');
    expect(formatarVagas(1)).toBe('1 vaga');
    expect(formatarVagas(2)).toBe('2 vagas');
  });

  it('formata datas', () => {
    expect(formatarMesAno('2028-10-01')).toBe('out/2028');
    expect(formatarMesPorExtenso('2026-10-01')).toBe('Outubro de 2026');
    expect(formatarDiaMes('2026-11-12')).toBe('12/nov');
  });

  it('conta meses entre datas', () => {
    expect(mesesEntre('2026-10-21', '2028-10-01')).toBe(24);
    expect(mesesEntre('2029-01-01', '2028-10-01')).toBe(0);
  });
});
