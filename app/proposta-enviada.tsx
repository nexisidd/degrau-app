import { router, useLocalSearchParams } from 'expo-router';
import { Check } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Screen } from '@/components';
import { api } from '@/data/api';
import { PRAZO_RESPOSTA_HORAS } from '@/lib/credito';
import { formatarMoeda } from '@/lib/formato';
import { colors, radius, size, space, type } from '@/theme';

export default function PropostaEnviadaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const imovel = api.imovel(String(id));

  return (
    <Screen dark withTabBar={false} scroll={false} contentStyle={styles.conteudo}>
      <View style={styles.centro}>
        <View style={styles.icone}>
          <Check size={size.iconLg * 1.5} color={colors.onMint} strokeWidth={size.stroke + 0.5} />
        </View>
        <Text style={[type.title, styles.surface, styles.texto]} accessibilityRole="header">
          Proposta enviada
        </Text>
        <Text style={[type.body, styles.onForestMuted, styles.texto]}>
          O proprietário recebe seu perfil agora. Você tem resposta em até {PRAZO_RESPOSTA_HORAS} horas
          {imovel ? `, e o preço de ${formatarMoeda(imovel.precoCompra)} fica reservado enquanto isso.` : '.'}
        </Text>
      </View>
      <View style={styles.acoes}>
        <Button label="Ir para Minha casa" onPress={() => router.dismissTo('/minha-casa')} />
        <Button label="Voltar ao início" variant="outlineOnDark" onPress={() => router.dismissTo('/')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  conteudo: { justifyContent: 'space-between' },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.lg },
  icone: {
    width: size.confirmIcon,
    height: size.confirmIcon,
    borderRadius: radius.pill,
    backgroundColor: colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.sm,
  },
  texto: { textAlign: 'center' },
  acoes: { gap: space.md },
  surface: { color: colors.surface },
  onForestMuted: { color: colors.onForestMuted },
});
