import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Heart } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Chip, IconButton, PhotoPlaceholder, ProgressBar, Screen } from '@/components';
import { api } from '@/data/api';
import {
  creditoAcumulado,
  creditoMensal,
  metaEntrada,
  PERCENTUAL_CREDITO,
  PERCENTUAL_ENTRADA,
  percentualDoImovel,
  PRAZO_MAXIMO_OPCAO,
  PRAZO_PADRAO,
  PRAZOS,
  progressoEntrada,
  type Prazo,
} from '@/lib/credito';
import { formatarMoeda, formatarPercentual, formatarVagas } from '@/lib/formato';
import { useAppStore, useEhFavorito } from '@/store/useAppStore';
import { colors, radius, shadow, size, space, type } from '@/theme';

const voltar = () => (router.canGoBack() ? router.back() : router.replace('/'));

export default function DetalheImovelScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const imovel = api.imovel(String(id));
  const insets = useSafeAreaInsets();
  const favorito = useEhFavorito(String(id));
  const alternarFavorito = useAppStore((s) => s.alternarFavorito);
  // Estado local: volta para o prazo padrão a cada imóvel aberto.
  const [prazo, setPrazo] = useState<Prazo>(PRAZO_PADRAO);
  useEffect(() => setPrazo(PRAZO_PADRAO), [id]);

  if (!imovel) {
    return (
      <Screen withTabBar={false}>
        <IconButton icon={ChevronLeft} accessibilityLabel="Voltar" onPress={voltar} />
        <Text style={[type.heading, styles.ink]}>Imóvel não encontrado</Text>
        <Button label="Voltar ao início" variant="dark" onPress={() => router.replace('/')} />
      </Screen>
    );
  }

  const mensal = creditoMensal(imovel.aluguel);
  const acumulado = creditoAcumulado(imovel.aluguel, prazo);
  const meta = metaEntrada(imovel.precoCompra);
  const progresso = progressoEntrada(acumulado, imovel.precoCompra);
  const doImovel = percentualDoImovel(acumulado, imovel.precoCompra);

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={{ paddingBottom: size.actionBar + insets.bottom + space.xxl }}>
        <View>
          <PhotoPlaceholder imovel={imovel} style={[styles.foto, { height: size.photoDetail + insets.top }]} iconSize={size.iconLg * 1.5} />
          <View style={[styles.fotoAcoes, { top: insets.top + space.md }]}>
            <IconButton icon={ChevronLeft} accessibilityLabel="Voltar" onPress={voltar} />
            <IconButton
              icon={Heart}
              filled={favorito}
              accessibilityLabel={favorito ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
              onPress={() => alternarFavorito(imovel.id)}
            />
          </View>
          <View style={styles.contadorFotos}>
            <Text style={[type.caption, styles.surface]}>1 de {imovel.totalFotos} fotos</Text>
          </View>
        </View>

        <View style={styles.conteudo}>
          <View style={styles.gapXs}>
            <Text style={[type.bodySm, styles.muted]}>
              {imovel.tipo} · {imovel.rua}
            </Text>
            <Text style={[type.title, styles.ink]} accessibilityRole="header">
              {formatarMoeda(imovel.aluguel)}/mês
            </Text>
            <Text style={[type.bodySm, styles.muted]}>{formatarMoeda(imovel.condominioIptu)} cond. + IPTU</Text>
            <Text style={[type.body, styles.ink]}>
              {imovel.m2} m² · {imovel.quartos} quartos · {formatarVagas(imovel.vagas)}
            </Text>
          </View>

          <View style={styles.travado}>
            <View style={styles.decor} />
            <Text style={[type.labelSm, styles.onForestMuted]}>Preço de compra travado</Text>
            <Text style={[type.number, styles.surface]}>{formatarMoeda(imovel.precoCompra)}</Text>
            <Text style={[type.bodySm, styles.onForestMuted]}>
              Reajuste anual pelo IPCA · opção válida por até {PRAZO_MAXIMO_OPCAO} meses
            </Text>
          </View>

          <View style={styles.caminho}>
            <Text style={[type.heading, styles.ink]} accessibilityRole="header">
              Seu caminho até ser dono
            </Text>
            <Text style={[type.body, styles.muted]}>
              {Math.round(PERCENTUAL_CREDITO * 100)}% do aluguel vira crédito: {formatarMoeda(mensal)} por mês
            </Text>
            <View style={styles.chips} accessibilityRole="radiogroup">
              {PRAZOS.map((m) => (
                <Chip key={m} label={`${m} meses`} selected={m === prazo} onPress={() => setPrazo(m)} />
              ))}
            </View>
            <View style={styles.acumulado} accessible accessibilityLiveRegion="polite">
              <Text style={[type.bodySm, styles.muted]}>Crédito acumulado no fim do prazo</Text>
              <Text style={[type.number, styles.green]}>{formatarMoeda(acumulado)}</Text>
              <ProgressBar value={progresso} accessibilityLabel={`${progresso}% da entrada`} />
              <Text style={[type.bodySm, styles.muted]}>
                {formatarPercentual(doImovel)} do imóvel · {progresso}% da entrada de {Math.round(PERCENTUAL_ENTRADA * 100)}% (
                {formatarMoeda(meta)})
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.barra, shadow.tabBar, { paddingBottom: insets.bottom + space.md }]}>
        <Button label="Agendar visita" variant="outline" disabled style={styles.flex} />
        <Button label="Quero morar" onPress={() => router.push(`/proposta-enviada?id=${imovel.id}`)} style={styles.flex} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  foto: { width: '100%' },
  fotoAcoes: {
    position: 'absolute',
    left: space.screen,
    right: space.screen,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contadorFotos: {
    position: 'absolute',
    right: space.screen,
    bottom: space.lg,
    backgroundColor: colors.forest,
    borderRadius: radius.pill,
    paddingHorizontal: space.md,
    paddingVertical: space.xs + 2,
  },
  conteudo: {
    paddingHorizontal: space.screen,
    paddingTop: space.xxl,
    gap: space.xxl,
    width: '100%',
    maxWidth: size.maxContent,
    alignSelf: 'center',
  },
  gapXs: { gap: space.xs },
  travado: { backgroundColor: colors.forest, borderRadius: radius.xl, padding: space.xxl, gap: space.xs, overflow: 'hidden' },
  decor: {
    position: 'absolute',
    right: -size.decorCircleSm / 3,
    bottom: -size.decorCircleSm / 2,
    width: size.decorCircleSm,
    height: size.decorCircleSm,
    borderRadius: radius.pill,
    backgroundColor: colors.forestRaised,
  },
  caminho: { gap: space.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: space.sm },
  acumulado: { backgroundColor: colors.surfaceRaised, borderRadius: radius.md, padding: space.xl, gap: space.sm },
  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: space.md,
    paddingHorizontal: space.screen,
    paddingTop: space.md,
    backgroundColor: colors.surfaceRaised,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },
  ink: { color: colors.ink },
  muted: { color: colors.inkMuted },
  green: { color: colors.green },
  surface: { color: colors.surface },
  onForestMuted: { color: colors.onForestMuted },
});
