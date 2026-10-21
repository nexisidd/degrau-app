import { BedDouble, Car, Heart, Ruler } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Imovel } from '@/data/tipos';
import { creditoAcumulado, PRAZO_PADRAO } from '@/lib/credito';
import { formatarMoeda, formatarMoedaCurta, formatarVagas } from '@/lib/formato';
import { useEhFavorito } from '@/store/useAppStore';
import { colors, radius, shadow, size, space, type } from '@/theme';
import { Badge } from './Badge';
import { IconButton } from './IconButton';
import { PhotoPlaceholder } from './PhotoPlaceholder';

interface PropertyCardProps {
  imovel: Imovel;
  layout: 'carousel' | 'list' | 'compact';
  onPress: () => void;
  onFavorite?: () => void;
}

export function PropertyCard({ imovel, layout, onPress, onFavorite }: PropertyCardProps) {
  const favorito = useEhFavorito(imovel.id);
  const aluguel = `${formatarMoeda(imovel.aluguel)}/mês`;
  const titulo = `${imovel.tipo} · ${layout === 'list' ? imovel.rua : imovel.bairro}`;
  const descricao = `${titulo}, ${aluguel}, compra ${formatarMoedaCurta(imovel.precoCompra)}`;

  if (layout === 'compact') {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={descricao}
        style={({ pressed }) => [styles.compact, pressed && styles.pressed]}
      >
        <PhotoPlaceholder imovel={imovel} style={styles.fotoCompact} iconSize={size.icon} />
        <View style={styles.compactTextos}>
          <Text style={[type.labelSm, styles.ink]}>{titulo}</Text>
          <Text style={[type.numberSm, styles.ink]}>{aluguel}</Text>
          <Text style={[type.bodySm, styles.green]}>
            Junta {formatarMoeda(creditoAcumulado(imovel.aluguel, PRAZO_PADRAO))} em {PRAZO_PADRAO} meses
          </Text>
        </View>
      </Pressable>
    );
  }

  const carousel = layout === 'carousel';

  return (
    <View style={[styles.card, carousel ? styles.cardCarousel : styles.cardList]}>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={descricao} style={({ pressed }) => pressed && styles.pressed}>
        <View>
          <PhotoPlaceholder imovel={imovel} style={carousel ? styles.fotoCarousel : styles.fotoList} />
          <Badge label={`Vira seu em ${PRAZO_PADRAO} meses`} tone="mint" dot style={styles.selo} />
        </View>
        <View style={styles.corpo}>
          <Text style={[type.bodySm, styles.muted]} numberOfLines={carousel ? 1 : 2}>
            {titulo}
          </Text>
          <View style={styles.linhaPreco}>
            <Text style={[type.heading, styles.ink]}>{aluguel}</Text>
            <Badge label={`compra ${formatarMoedaCurta(imovel.precoCompra)}`} tone="mintSoft" />
          </View>
          {carousel ? (
            <View style={styles.caracteristicas}>
              <Caracteristica icon={Ruler} texto={`${imovel.m2} m²`} />
              <Caracteristica icon={BedDouble} texto={String(imovel.quartos)} />
              <Caracteristica icon={Car} texto={String(imovel.vagas)} />
            </View>
          ) : (
            <Text style={[type.bodySm, styles.muted]}>
              {imovel.m2} m² · {imovel.quartos} quartos · {formatarVagas(imovel.vagas)}
            </Text>
          )}
        </View>
      </Pressable>
      {onFavorite ? (
        <IconButton
          icon={Heart}
          filled={favorito}
          accessibilityLabel={favorito ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
          onPress={onFavorite}
          style={styles.favorito}
        />
      ) : null}
    </View>
  );
}

function Caracteristica({ icon: Icon, texto }: { icon: typeof Ruler; texto: string }) {
  return (
    <View style={styles.caracteristica}>
      <Icon size={size.iconSm} color={colors.inkMuted} strokeWidth={size.stroke} />
      <Text style={[type.bodySm, styles.muted]}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surfaceRaised, borderRadius: radius.lg, overflow: 'hidden', ...shadow.card },
  cardCarousel: { width: size.cardCarousel },
  cardList: { width: '100%' },
  fotoCarousel: { height: size.photoCarousel },
  fotoList: { height: size.photoList },
  selo: { position: 'absolute', left: space.md, top: space.md },
  favorito: { position: 'absolute', right: space.md, top: space.md },
  corpo: { padding: space.lg, gap: space.sm },
  linhaPreco: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: space.sm },
  caracteristicas: { flexDirection: 'row', gap: space.lg },
  caracteristica: { flexDirection: 'row', alignItems: 'center', gap: space.xs },
  compact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    padding: space.md,
    backgroundColor: colors.surfaceRaised,
    borderRadius: radius.md,
  },
  fotoCompact: { width: size.photoCompact, height: size.photoCompact, borderRadius: radius.sm },
  compactTextos: { flex: 1, gap: space.xxs },
  ink: { color: colors.ink },
  muted: { color: colors.inkMuted },
  green: { color: colors.green },
  pressed: { opacity: 0.9 },
});
