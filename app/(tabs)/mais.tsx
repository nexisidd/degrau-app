import { router } from 'expo-router';
import {
  CalendarDays,
  FileText,
  Heart,
  House,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  User,
  Wallet,
  type LucideIcon,
} from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { ListRow, Screen } from '@/components';
import { useAppStore } from '@/store/useAppStore';
import { colors, radius, space, type } from '@/theme';

interface Item {
  label: string;
  icon: LucideIcon;
  /** Sem onPress = ainda não disponível no MVP. */
  onPress?: () => void;
}

export default function MaisScreen() {
  const setPerfil = useAppStore((s) => s.setPerfil);

  const grupos: { titulo: string; itens: Item[] }[] = [
    {
      titulo: 'Seu caminho até ser dono',
      itens: [
        { label: 'Meu crédito para a entrada', icon: TrendingUp, onPress: () => router.navigate('/minha-casa') },
        { label: 'Favoritos', icon: Heart, onPress: () => router.push('/favoritos') },
        { label: 'Visitas e propostas', icon: CalendarDays },
        { label: 'Meu perfil de interesse', icon: User },
      ],
    },
    {
      titulo: 'Para quem vende',
      itens: [
        {
          label: 'Anunciar imóvel com opção de compra',
          icon: House,
          onPress: () => {
            setPerfil('proprietario');
            router.navigate('/');
          },
        },
        { label: 'Pagamentos', icon: Wallet },
        { label: 'Gestão da venda', icon: FileText },
      ],
    },
    {
      titulo: 'Ajuda',
      itens: [
        { label: 'Conversas', icon: MessageCircle, onPress: () => router.push('/conversas') },
        { label: 'Termos e privacidade', icon: ShieldCheck },
      ],
    },
  ];

  return (
    <Screen>
      <Text style={[type.title, styles.ink]} accessibilityRole="header">
        Mais
      </Text>
      {grupos.map((g) => (
        <View key={g.titulo} style={styles.grupo}>
          <Text style={[type.labelSm, styles.muted]} accessibilityRole="header">
            {g.titulo}
          </Text>
          <View style={styles.lista}>
            {g.itens.map((it, i) => (
              <ListRow key={it.label} label={it.label} icon={it.icon} onPress={it.onPress} disabled={!it.onPress} divider={i > 0} />
            ))}
          </View>
        </View>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  grupo: { gap: space.sm },
  lista: { backgroundColor: colors.surfaceRaised, borderRadius: radius.md, overflow: 'hidden' },
  ink: { color: colors.ink },
  muted: { color: colors.inkMuted },
});
