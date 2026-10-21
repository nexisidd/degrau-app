// Projeção simples para o mapa estático da fase 1: encaixa as coordenadas dos imóveis
// na área visível, com margem. Sai quando entrar o react-native-maps.

interface Ponto {
  lat: number;
  lng: number;
}

interface Area {
  largura: number;
  altura: number;
  /** Faixa livre no topo (barra de busca e contador). */
  topo: number;
  /** Faixa livre embaixo (botão de lista e barra inferior). */
  base: number;
  margem: number;
}

export function projetarPinos<T extends { coordenadas: Ponto }>(itens: T[], area: Area): { item: T; x: number; y: number }[] {
  if (itens.length === 0 || area.largura <= 0 || area.altura <= 0) return [];
  const lats = itens.map((i) => i.coordenadas.lat);
  const lngs = itens.map((i) => i.coordenadas.lng);
  const [latMin, latMax] = [Math.min(...lats), Math.max(...lats)];
  const [lngMin, lngMax] = [Math.min(...lngs), Math.max(...lngs)];
  const largura = area.largura - area.margem * 2;
  const altura = area.altura - area.topo - area.base;

  return itens.map((item) => {
    const fx = lngMax === lngMin ? 0.5 : (item.coordenadas.lng - lngMin) / (lngMax - lngMin);
    // Latitude cresce para o norte, a tela cresce para baixo.
    const fy = latMax === latMin ? 0.5 : (latMax - item.coordenadas.lat) / (latMax - latMin);
    return { item, x: area.margem + fx * largura, y: area.topo + fy * altura };
  });
}
