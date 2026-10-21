import { router } from 'expo-router';
import { Building2, ChevronLeft, Headphones, Users } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton, ListRow, Screen } from '@/components';
import { colors, radius, space, type } from '@/theme';

// Chat fica fora do MVP: os canais aparecem, mas respondem "Em breve".
const CANAIS = [
  { label: 'Com o proprietário', description: 'Reparos, melhorias e a compra', icon: Building2 },
  { label: 'Com corretores', description: 'Visitas e dúvidas', icon: Users },
  { label: 'Ajuda Degrau', description: 'Contrato, crédito e pagamentos', icon: Headphones },
];

export default function ConversasScreen() {
  return (
    <Screen withTabBar={false}>
      <View style={styles.header}>
        <IconButton icon={ChevronLeft} accessibilityLabel="Voltar" onPress={() => (router.canGoBack() ? router.back() : router.replace('/mais'))} />
        <Text style={[type.title, styles.ink]} accessibilityRole="header">
          Conversas
        </Text>
      </View>
      <View style={styles.lista}>
        {CANAIS.map((c, i) => (
          <ListRow key={c.label} label={c.label} description={c.description} icon={c.icon} disabled divider={i > 0} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: space.lg },
  lista: { backgroundColor: colors.surfaceRaised, borderRadius: radius.md, overflow: 'hidden' },
  ink: { color: colors.ink },
});
