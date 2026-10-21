import { router } from 'expo-router';
import { List, Map as MapIcon, SlidersHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, PropertyCard, Screen } from '@/components';
import { api, type Imovel } from '@/data/api';
import { formatarMoedaCurta } from '@/lib/formato';
import { projetarPinos } from '@/lib/mapa';
import { useAppStore } from '@/store/useAppStore';
import { emBreve } from '@/store/useToast';
import { colors, mapColors, mapShapes, radius, shadow, size, space, type } from '@/theme';

const contarImoveis = (n: number) => (n === 1 ? '1 imóvel' : `${n} imóveis`);

export default function BuscarScreen() {
  const modoBusca = useAppStore((s) => s.modoBusca);
  const setModoBusca = useAppStore((s) => s.setModoBusca);
  const filtroPorFaixa = useAppStore((s) => s.filtroPorFaixa);
  const setFiltroPorFaixa = useAppStore((s) => s.setFiltroPorFaixa);
  const faixa = api.faixas()[useAppStore((s) => s.faixaSimulador)];
  const insets = useSafeAreaInsets();

  const imoveis = filtroPorFaixa ? api.imoveisNaFaixa(faixa) : api.imoveis();
  const abrir = (i: Imovel) => router.push(`/imovel/${i.id}`);

  const mostrarMapa = () => {
    setFiltroPorFaixa(false);
    setModoBusca('mapa');
  };

  return (
    <View style={styles.flex}>
      {modoBusca === 'mapa' ? <Mapa imoveis={api.imoveis()} onAbrir={abrir} /> : <Lista imoveis={imoveis} filtrado={filtroPorFaixa} faixaLabel={faixa.label} onAbrir={abrir} onVerTodos={() => setFiltroPorFaixa(false)} />}
      <View style={[styles.alternar, { bottom: insets.bottom + size.tabBarClearance - space.sm }]} pointerEvents="box-none">
        {modoBusca === 'mapa' ? (
          <Button label="Mostrar lista" variant="dark" size="md" icon={List} onPress={() => setModoBusca('lista')} style={shadow.tabBar} />
        ) : (
          <Button label="Mostrar mapa" variant="dark" size="md" icon={MapIcon} onPress={mostrarMapa} style={shadow.tabBar} />
        )}
      </View>
    </View>
  );
}

function Lista({
  imoveis,
  filtrado,
  faixaLabel,
  onAbrir,
  onVerTodos,
}: {
  imoveis: Imovel[];
  filtrado: boolean;
  faixaLabel: string;
  onAbrir: (i: Imovel) => void;
  onVerTodos: () => void;
}) {
  const alternarFavorito = useAppStore((s) => s.alternarFavorito);
  const titulo = filtrado ? 'Cabem no seu bolso' : 'Real Parque e região';
  const subtitulo = filtrado
    ? `Aluguel na faixa ${faixaLabel.charAt(0).toLowerCase()}${faixaLabel.slice(1)} · ${contarImoveis(imoveis.length)}`
    : `${contarImoveis(imoveis.length)} com opção de compra`;

  return (
    <Screen contentStyle={styles.listaConteudo}>
      <View style={styles.gapXs}>
        <Text style={[type.title, styles.ink]} accessibilityRole="header">
          {titulo}
        </Text>
        <Text style={[type.body, styles.muted]}>{subtitulo}</Text>
      </View>
      {imoveis.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={[type.heading, styles.ink]}>Nenhum imóvel nessa faixa ainda</Text>
          <Text style={[type.body, styles.muted]}>Novos imóveis com opção de compra entram toda semana. Veja os que já estão disponíveis.</Text>
          <Button label="Ver todos os imóveis" variant="dark" onPress={onVerTodos} style={styles.alinharInicio} />
        </View>
      ) : (
        imoveis.map((i) => <PropertyCard key={i.id} imovel={i} layout="list" onPress={() => onAbrir(i)} onFavorite={() => alternarFavorito(i.id)} />)
      )}
    </Screen>
  );
}

function Mapa({ imoveis, onAbrir }: { imoveis: Imovel[]; onAbrir: (i: Imovel) => void }) {
  const insets = useSafeAreaInsets();
  const [area, setArea] = useState({ largura: 0, altura: 0 });
  const topoBusca = insets.top + space.lg;
  const pinos = projetarPinos(imoveis, {
    largura: area.largura,
    altura: area.altura,
    topo: topoBusca + size.searchBar + space.xxxl * 3,
    base: insets.bottom + size.tabBarClearance + size.touch + space.xxxl,
    margem: space.xxxl * 2,
  });

  return (
    <View
      style={styles.mapa}
      onLayout={(e) => setArea({ largura: e.nativeEvent.layout.width, altura: e.nativeEvent.layout.height })}
    >
      {/* Mapa ilustrado da fase 1: ruas, rio e praças. */}
      <View style={styles.decoracao} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <View style={[styles.rua, styles.rua1]} />
        <View style={[styles.rua, styles.rua2]} />
        <View style={[styles.rua, styles.rua3]} />
        <View style={styles.rio} />
        <View style={[styles.praca, styles.praca1]} />
        <View style={[styles.praca, styles.praca2]} />
        <Text style={[type.overline, styles.muted, styles.rotulo1]}>MORUMBI</Text>
        <Text style={[type.overline, styles.muted, styles.rotulo2]}>REAL PARQUE</Text>
      </View>

      <Pressable
        onPress={emBreve}
        accessibilityRole="button"
        accessibilityLabel="Real Parque, São Paulo. Morar e comprar, 3 filtros"
        accessibilityHint="Em breve"
        style={[styles.busca, shadow.card, { top: topoBusca }]}
      >
        <SlidersHorizontal size={size.icon} color={colors.ink} strokeWidth={size.stroke} />
        <View style={styles.flex}>
          <Text style={[type.label, styles.ink]}>Real Parque, São Paulo</Text>
          <Text style={[type.bodySm, styles.muted]}>Morar e comprar · 3 filtros</Text>
        </View>
      </Pressable>

      <View style={[styles.contador, { top: topoBusca + size.searchBar + space.lg }]}>
        <Text style={[type.caption, styles.surface]}>{contarImoveis(imoveis.length)} com opção de compra</Text>
      </View>

      {pinos.map(({ item, x, y }) => (
        <Pressable
          key={item.id}
          onPress={() => onAbrir(item)}
          accessibilityRole="button"
          accessibilityLabel={`${item.tipo} em ${item.bairro}, aluguel ${formatarMoedaCurta(item.aluguel)}`}
          hitSlop={8}
          style={[styles.pino, shadow.card, { left: x - size.touch, top: y - size.mapPin / 2 }]}
        >
          <Text style={[type.labelSm, styles.surface]}>{formatarMoedaCurta(item.aluguel)}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  gapXs: { gap: space.xs },
  listaConteudo: { gap: space.lg },
  alternar: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  vazio: { backgroundColor: colors.surfaceSunken, borderRadius: radius.lg, padding: space.xxl, gap: space.sm },
  alinharInicio: { alignSelf: 'flex-start', marginTop: space.sm },
  mapa: { flex: 1, backgroundColor: mapColors.ground, overflow: 'hidden' },
  decoracao: { ...StyleSheet.absoluteFill },
  rua: { position: 'absolute', backgroundColor: mapColors.road },
  rua1: { left: '-10%', top: '24%', width: '130%', height: mapShapes.roadWide, transform: [{ rotate: '-18deg' }] },
  rua2: { left: '46%', top: '-5%', width: mapShapes.road, height: '110%', transform: [{ rotate: '14deg' }] },
  rua3: { left: '-5%', top: '66%', width: '120%', height: mapShapes.roadNarrow, transform: [{ rotate: '9deg' }] },
  rio: { position: 'absolute', right: 0, top: 0, bottom: 0, width: '22%', backgroundColor: mapColors.water },
  praca: { position: 'absolute', backgroundColor: mapColors.park },
  praca1: { left: '10%', top: '40%', ...mapShapes.park, borderRadius: radius.lg },
  praca2: { left: '54%', top: '78%', ...mapShapes.parkSm, borderRadius: radius.md },
  rotulo1: { position: 'absolute', left: '52%', top: '30%' },
  rotulo2: { position: 'absolute', left: '6%', top: '74%' },
  busca: {
    position: 'absolute',
    left: space.lg,
    right: space.lg,
    minHeight: size.searchBar,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceRaised,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingHorizontal: space.xl,
    paddingVertical: space.sm,
  },
  contador: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.forest,
    borderRadius: radius.pill,
    paddingHorizontal: space.md + 2,
    paddingVertical: space.sm,
  },
  pino: {
    position: 'absolute',
    width: size.touch * 2,
    minHeight: size.mapPin,
    borderRadius: radius.pill,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.sm,
  },
  ink: { color: colors.ink },
  muted: { color: colors.inkMuted },
  surface: { color: colors.surface },
});
