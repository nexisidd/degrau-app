import { router } from 'expo-router';
import { ChevronLeft, Heart } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Button, IconButton, PropertyCard, Screen } from '@/components';
import { api } from '@/data/api';
import { useAppStore } from '@/store/useAppStore';
import { colors, radius, size, space, type } from '@/theme';

export default function FavoritosScreen() {
  const ids = useAppStore((s) => s.favoritos);
  const favoritos = api.imoveisPorIds(ids);

  return (
    <Screen withTabBar={false}>
      <View style={styles.header}>
        <IconButton icon={ChevronLeft} accessibilityLabel="Voltar" onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
        <Text style={[type.title, styles.ink]} accessibilityRole="header">
          Favoritos
        </Text>
      </View>

      {favoritos.length === 0 ? (
        <>
          <View style={styles.dica}>
            <Text style={[type.label, styles.forest]}>Compare antes de decidir</Text>
            <Text style={[type.bodySm, styles.forest]}>
              Salve imóveis e veja lado a lado quanto você junta em cada um até virar dono.
            </Text>
          </View>
          <View style={styles.vazio}>
            <View style={styles.iconeVazio}>
              <Heart size={size.iconLg} color={colors.forest} strokeWidth={size.stroke} />
            </View>
            <Text style={[type.heading, styles.ink, styles.centro]}>Nenhum imóvel salvo ainda</Text>
            <Text style={[type.body, styles.muted, styles.centro]}>
              Toque no coração de um imóvel e ele aparece aqui, com o seu caminho até a compra.
            </Text>
            <Button label="Descobrir imóveis" variant="dark" onPress={() => router.navigate('/descobrir')} />
          </View>
        </>
      ) : (
        <View style={styles.lista}>
          {favoritos.map((i) => (
            <PropertyCard key={i.id} imovel={i} layout="compact" onPress={() => router.push(`/imovel/${i.id}`)} />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: space.lg },
  dica: { backgroundColor: colors.mintSoft, borderRadius: radius.md, padding: space.lg, gap: space.xs },
  vazio: { alignItems: 'center', gap: space.md, paddingVertical: space.xxxl },
  iconeVazio: {
    width: size.confirmIcon - space.lg,
    height: size.confirmIcon - space.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSunken,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centro: { textAlign: 'center' },
  lista: { gap: space.md },
  ink: { color: colors.ink },
  muted: { color: colors.inkMuted },
  forest: { color: colors.forest },
});
