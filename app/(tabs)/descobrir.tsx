import { router } from 'expo-router';
import { Heart, MapPin } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Button, IconButton, Logo, PhotoPlaceholder, Screen } from '@/components';
import { api } from '@/data/api';
import { creditoAcumulado, PRAZO_PADRAO } from '@/lib/credito';
import { formatarMoeda } from '@/lib/formato';
import { useAppStore, useEhFavorito } from '@/store/useAppStore';
import { colors, radius, size, space, type } from '@/theme';

export default function DescobrirScreen() {
  const imoveis = api.imoveis();
  const cidade = api.usuario().cidade;
  const indice = useAppStore((s) => s.indiceDescobrir) % imoveis.length;
  const proximo = useAppStore((s) => s.proximoDescobrir);
  const alternarFavorito = useAppStore((s) => s.alternarFavorito);
  const imovel = imoveis[indice];
  const favorito = useEhFavorito(imovel.id);

  return (
    <Screen dark>
      <View style={styles.header}>
        <Logo variant="dark" />
        <Text style={[type.labelSm, styles.muted]}>
          {indice + 1} de {imoveis.length}
        </Text>
      </View>

      <View style={styles.gapSm}>
        <Text style={[type.title, styles.surface]} accessibilityRole="header">
          Descobrir
        </Text>
        <View style={styles.pontos} accessibilityLabel={`Imóvel ${indice + 1} de ${imoveis.length}`} accessible>
          {imoveis.map((i, n) => (
            <View key={i.id} style={[styles.ponto, n === indice && styles.pontoAtivo]} />
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <PhotoPlaceholder imovel={imovel} style={styles.foto} />
        <View style={styles.corpo}>
          <View style={styles.linha}>
            <MapPin size={size.iconSm} color={colors.inkMuted} strokeWidth={size.stroke} />
            <Text style={[type.bodySm, styles.muted2]}>
              {imovel.bairro}, {cidade}
            </Text>
          </View>
          <Text style={[type.title, styles.ink]}>{formatarMoeda(imovel.aluguel)}/mês</Text>
          <Text style={[type.body, styles.ink]}>Compra travada em {formatarMoeda(imovel.precoCompra)}</Text>
          <View style={styles.credito}>
            <Text style={[type.bodySm, styles.forest]}>
              Em {PRAZO_PADRAO} meses você junta{' '}
              <Text style={styles.negrito}>{formatarMoeda(creditoAcumulado(imovel.aluguel, PRAZO_PADRAO))}</Text> para a entrada
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.acoes}>
        <Button label="Próximo" variant="outlineOnDark" onPress={() => proximo(imoveis.length)} style={styles.flex} />
        <IconButton
          icon={Heart}
          variant="forest"
          filled={favorito}
          accessibilityLabel={favorito ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
          onPress={() => alternarFavorito(imovel.id)}
        />
        <Button label="Ver imóvel" onPress={() => router.push(`/imovel/${imovel.id}`)} style={styles.flex} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  gapSm: { gap: space.sm },
  pontos: { flexDirection: 'row', gap: space.xs + 2, alignItems: 'center' },
  ponto: { width: size.dot, height: size.dot, borderRadius: radius.pill, backgroundColor: colors.onForestMuted },
  pontoAtivo: { width: size.dotActive, backgroundColor: colors.mint },
  card: { backgroundColor: colors.surfaceRaised, borderRadius: radius.xl, overflow: 'hidden' },
  foto: { height: size.photoDiscover },
  corpo: { padding: space.xl, gap: space.sm },
  linha: { flexDirection: 'row', alignItems: 'center', gap: space.xs },
  credito: { backgroundColor: colors.mintSoft, borderRadius: radius.sm, padding: space.md, marginTop: space.xs },
  negrito: { fontFamily: type.label.fontFamily },
  acoes: { flexDirection: 'row', alignItems: 'center', gap: space.md },
  surface: { color: colors.surface },
  muted: { color: colors.onForestMuted },
  muted2: { color: colors.inkMuted },
  ink: { color: colors.ink },
  forest: { color: colors.forest },
});
