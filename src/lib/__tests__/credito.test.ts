import {
  creditoAcumulado,
  creditoMensal,
  metaEntrada,
  percentualDoImovel,
  progressoEntrada,
  PRAZO_MAXIMO_OPCAO,
  PRAZO_PADRAO,
  PRAZOS,
} from '../credito';

describe('credito', () => {
  describe('caso de conferência do protótipo: aluguel R$ 3.400, compra R$ 520.000', () => {
    const aluguel = 3400;
    const preco = 520000;

    it('gera R$ 1.020 de crédito por mês', () => {
      expect(creditoMensal(aluguel)).toBeCloseTo(1020);
    });

    it('acumula R$ 30.600 em 30 meses', () => {
      expect(creditoAcumulado(aluguel, 30)).toBeCloseTo(30600);
    });

    it('tem meta de entrada de R$ 104.000', () => {
      expect(metaEntrada(preco)).toBeCloseTo(104000);
    });

    it('chega a 29% da entrada em 30 meses', () => {
      expect(progressoEntrada(creditoAcumulado(aluguel, 30), preco)).toBe(29);
    });

    it('cobre 5,9% do preço do imóvel em 30 meses', () => {
      expect(percentualDoImovel(creditoAcumulado(aluguel, 30), preco)).toBe(5.9);
    });
  });

  it('calcula o crédito acumulado em cada prazo oferecido', () => {
    expect(PRAZOS.map((m) => Math.round(creditoAcumulado(3400, m)))).toEqual([24480, 30600, 36720]);
  });

  it('calcula o resultado do simulador para as 3 faixas', () => {
    expect([2600, 3700, 5200].map((a) => Math.round(creditoAcumulado(a, 30)))).toEqual([23400, 33300, 46800]);
  });

  it('limita o progresso a 100%', () => {
    expect(progressoEntrada(500000, 520000)).toBe(100);
  });

  it('não devolve progresso negativo nem divide por zero', () => {
    expect(progressoEntrada(-10, 520000)).toBe(0);
    expect(progressoEntrada(1000, 0)).toBe(0);
  });

  it('mostra 12% da meta no contrato atual (R$ 12.400 de R$ 104.000)', () => {
    expect(progressoEntrada(12400, 520000)).toBe(12);
  });

  it('usa 30 meses como prazo padrão e 36 como validade máxima', () => {
    expect(PRAZO_PADRAO).toBe(30);
    expect(PRAZO_MAXIMO_OPCAO).toBe(36);
  });
});
