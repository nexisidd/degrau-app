import { router } from 'expo-router';
import { ArrowRight, ChevronDown, Heart, User } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Badge, Button, Chip, IconButton, Logo, PropertyCard, Screen, Segmented, StatTile } from '@/components';
import { api } from '@/data/api';
import { creditoAcumulado, PRAZO_PADRAO } from '@/lib/credito';
import { formatarMoeda, formatarMoedaCurta } from '@/lib/formato';
import { emBreve } from '@/store/useToast';
import { useAppStore, type IndiceFaixa, type Perfil } from '@/store/useAppStore';
import { colors, radius, size, space, type } from '@/theme';

const PERFIS: { value: Perfil; label: string }[] = [
  { value: 'inquilino', label: 'Quero morar e comprar' },
  { value: 'proprietario', label: 'Quero vender' },
];

const TITULOS: Record<Perfil, string> = {
  inquilino: 'Seu aluguel pode virar a sua casa',
  proprietario: 'Seu imóvel no ar, com comprador à vista',
};

export default function InicioScreen() {
  const perfil = useAppStore((s) => s.perfil);
  const setPerfil = useAppStore((s) => s.setPerfil);
  const usuario = api.usuario();

  return (
    <Screen>
      <View style={styles.header}>
        <Logo variant="light" />
        <View style={styles.headerAcoes}>
          <Pressable
            onPress={emBreve}
            accessibilityRole="button"
            accessibilityLabel={`Cidade: ${usuario.cidade}`}
            accessibilityHint="Em breve"
            style={styles.cidade}
          >
            <Text style={[type.labelSm, styles.ink]}>{usuario.cidade}</Text>
            <ChevronDown size={size.iconSm} color={colors.ink} strokeWidth={size.stroke} />
          </Pressable>
          <IconButton icon={Heart} accessibilityLabel="Favoritos" onPress={() => router.push('/favoritos')} />
        </View>
      </View>

      <View style={styles.saudacao}>
        <Text style={[type.body, styles.muted]}>Oi, {usuario.nome}</Text>
        <Text style={[type.title, styles.ink]} accessibilityRole="header">
          {TITULOS[perfil]}
        </Text>
      </View>

      <Segmented options={PERFIS} value={perfil} onChange={setPerfil} />

      {perfil === 'inquilino' ? <PerfilInquilino /> : <PerfilProprietario />}
    </Screen>
  );
}

function PerfilInquilino() {
  const faixaSimulador = useAppStore((s) => s.faixaSimulador);
  const setFaixaSimulador = useAppStore((s) => s.setFaixaSimulador);
  const setModoBusca = useAppStore((s) => s.setModoBusca);
  const setFiltroPorFaixa = useAppStore((s) => s.setFiltroPorFaixa);
  const alternarFavorito = useAppStore((s) => s.alternarFavorito);
  const faixas = api.faixas();
  const faixa = faixas[faixaSimulador];
  const imoveis = api.imoveis();

  const verQueCabem = () => {
    setModoBusca('lista');
    setFiltroPorFaixa(true);
    router.navigate('/buscar');
  };

  return (
    <>
      <View style={styles.simulador}>
        <View style={styles.decor} />
        <Text style={[type.overline, styles.mint]}>SIMULADOR DEGRAU</Text>
        <Text style={[type.heading, styles.surface]} accessibilityRole="header">
          Quanto falta para você ser dono?
        </Text>
        <Text style={[type.bodySm, styles.onForestMuted]}>Quanto você quer pagar de aluguel por mês?</Text>
        <View style={styles.chips} accessibilityRole="radiogroup">
          {faixas.map((f, i) => (
            <Chip key={f.label} label={f.label} selected={i === faixaSimulador} onPress={() => setFaixaSimulador(i as IndiceFaixa)} onDark />
          ))}
        </View>
        <View style={styles.resultado} accessible accessibilityLiveRegion="polite">
          <Text style={[type.bodySm, styles.surface]}>Em {PRAZO_PADRAO} meses você junta</Text>
          <Text style={[type.number, styles.mint]}>{formatarMoeda(creditoAcumulado(faixa.aluguelReferencia, PRAZO_PADRAO))}</Text>
          <Text style={[type.bodySm, styles.surface]}>
            e pode comprar imóveis de até <Text style={styles.negrito}>{formatarMoedaCurta(faixa.imovelMaximo)}</Text>
          </Text>
        </View>
        <Button label="Ver imóveis que cabem" icon={ArrowRight} onPress={verQueCabem} />
      </View>

      <View style={styles.secao}>
        <View style={styles.secaoHeader}>
          <View style={styles.flex}>
            <Text style={[type.heading, styles.ink]} accessibilityRole="header">
              Mora agora, compra depois
            </Text>
            <Text style={[type.bodySm, styles.muted]}>Novos com opção de compra</Text>
          </View>
          <Pressable onPress={() => router.navigate('/buscar')} accessibilityRole="link" style={styles.link}>
            <Text style={[type.labelSm, styles.green]}>Ver todos</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sangria} contentContainerStyle={styles.carrossel}>
          {imoveis.map((i) => (
            <PropertyCard
              key={i.id}
              imovel={i}
              layout="carousel"
              onPress={() => router.push(`/imovel/${i.id}`)}
              onFavorite={() => alternarFavorito(i.id)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.secao}>
        <Text style={[type.heading, styles.ink]} accessibilityRole="header">
          Bairros com mais opção de compra
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sangria} contentContainerStyle={styles.carrossel}>
          {api.bairros().map((b) => {
            const bg = colors[b.tom];
            const fg = b.tom === 'mintSoft' ? colors.forest : colors.surface;
            return (
              <Pressable
                key={b.nome}
                onPress={() => router.navigate('/buscar')}
                accessibilityRole="button"
                accessibilityLabel={`${b.nome}, ${b.quantidade} imóveis`}
                style={[styles.bairro, { backgroundColor: bg }]}
              >
                <Text style={[type.heading, { color: fg }]}>{b.nome}</Text>
                <View style={styles.bairroRodape}>
                  <Text style={[type.bodySm, { color: fg }]}>{b.quantidade} imóveis</Text>
                  <ArrowRight size={size.iconSm + 2} color={fg} strokeWidth={size.stroke} />
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.comecar}>
        <Text style={[type.heading, styles.ink]}>Não sabe por onde começar?</Text>
        <Text style={[type.body, styles.muted]}>Veja um imóvel por vez, no seu ritmo</Text>
        <Button label="Descobrir imóveis" variant="dark" onPress={() => router.navigate('/descobrir')} style={styles.alinharInicio} />
      </View>
    </>
  );
}

function PerfilProprietario() {
  const anuncio = api.anuncioProprietario();

  return (
    <>
      <View style={styles.card}>
        <Badge label="No ar com opção de compra" tone="mintSoft" dot />
        <View style={styles.gapXs}>
          <Text style={[type.heading, styles.ink]}>{anuncio.endereco}</Text>
          <Text style={[type.bodySm, styles.muted]}>
            Aluguel {formatarMoeda(anuncio.aluguel)} · venda {formatarMoeda(anuncio.precoVenda)}
          </Text>
        </View>
        <View style={styles.stats}>
          <StatTile value={anuncio.visualizacoes} label="Visualizações" />
          <StatTile value={anuncio.visitas} label="Visitas" />
          <StatTile value={anuncio.interessados} label="Interessados" highlight />
        </View>
      </View>

      <View style={styles.secao}>
        <View>
          <Text style={[type.heading, styles.ink]} accessibilityRole="header">
            Quem quer morar e comprar
          </Text>
          <Text style={[type.bodySm, styles.muted]}>Nome e contato aparecem quando a pessoa aceitar</Text>
        </View>
        {api.perfisInteressados().map((p, i) => (
          <View key={p.id} style={styles.card}>
            <View style={styles.perfilHeader}>
              <View style={styles.avatar}>
                <User size={size.icon - 2} color={colors.forest} strokeWidth={size.stroke} />
              </View>
              <Text style={[type.label, styles.ink, styles.flex]}>Perfil {i + 1}</Text>
              <Badge label={p.status} tone={p.status === 'Pré-aprovado' ? 'mint' : 'mintSoft'} />
            </View>
            <Text style={[type.bodySm, styles.muted]}>{p.resumo}</Text>
            <Button label="Ver perfil" variant="outline" size="md" disabled style={styles.alinharInicio} />
          </View>
        ))}
      </View>

      <View style={styles.simulador}>
        <View style={styles.decor} />
        <Text style={[type.heading, styles.surface]}>Tem outro imóvel parado?</Text>
        <Text style={[type.body, styles.onForestMuted]}>Receba aluguel garantido enquanto espera o comprador certo.</Text>
        <Button label="Anunciar imóvel" disabled style={styles.alinharInicio} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerAcoes: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  cidade: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    minHeight: size.touch,
    paddingHorizontal: space.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceRaised,
  },
  saudacao: { gap: space.xs },
  simulador: {
    backgroundColor: colors.forest,
    borderRadius: radius.xl,
    padding: space.xxl,
    gap: space.md,
    overflow: 'hidden',
  },
  decor: {
    position: 'absolute',
    right: -size.decorCircle / 3,
    top: -size.decorCircle / 3,
    width: size.decorCircle,
    height: size.decorCircle,
    borderRadius: radius.pill,
    backgroundColor: colors.forestRaised,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  resultado: {
    backgroundColor: colors.forestRaised,
    borderRadius: radius.md,
    padding: space.lg,
    gap: space.xs,
  },
  negrito: { fontFamily: type.label.fontFamily },
  secao: { gap: space.lg },
  secaoHeader: { flexDirection: 'row', alignItems: 'flex-end', gap: space.md },
  link: { minHeight: size.touch, justifyContent: 'center' },
  sangria: { marginHorizontal: -space.screen },
  carrossel: { paddingHorizontal: space.screen, gap: space.md, paddingBottom: space.sm },
  bairro: {
    width: size.neighborhoodWidth,
    minHeight: size.neighborhoodHeight,
    borderRadius: radius.md,
    padding: space.lg,
    justifyContent: 'space-between',
  },
  bairroRodape: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  comecar: {
    backgroundColor: colors.surfaceSunken,
    borderRadius: radius.lg,
    padding: space.xxl,
    gap: space.sm,
  },
  alinharInicio: { alignSelf: 'flex-start', marginTop: space.sm },
  card: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: radius.lg,
    padding: space.xl,
    gap: space.md,
  },
  gapXs: { gap: space.xs },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  perfilHeader: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  avatar: {
    width: size.avatar,
    height: size.avatar,
    borderRadius: radius.pill,
    backgroundColor: colors.mintSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ink: { color: colors.ink },
  muted: { color: colors.inkMuted },
  green: { color: colors.green },
  mint: { color: colors.mint },
  surface: { color: colors.surface },
  onForestMuted: { color: colors.onForestMuted },
});
