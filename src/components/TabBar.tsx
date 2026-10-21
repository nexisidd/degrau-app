import type { BottomTabBarProps } from 'expo-router/tabs';
import { Ellipsis, House, Key, Search, Smartphone, type LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, shadow, size, space, type } from '@/theme';

const abas: Record<string, { label: string; icon: LucideIcon }> = {
  index: { label: 'Início', icon: House },
  buscar: { label: 'Buscar', icon: Search },
  descobrir: { label: 'Descobrir', icon: Smartphone },
  'minha-casa': { label: 'Minha casa', icon: Key },
  mais: { label: 'Mais', icon: Ellipsis },
};

/** Barra inferior flutuante em pílula forest; aba ativa com fundo mint. */
export function TabBar({ state, emitter, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      accessibilityRole="tablist"
      style={[styles.bar, shadow.tabBar, { bottom: Math.max(insets.bottom, size.tabBarBottom) }]}
    >
      {state.routes.map((route, index) => {
        const aba = abas[route.name];
        if (!aba) return null;
        const ativa = state.index === index;
        const Icon = aba.icon;
        const cor = ativa ? colors.onMint : colors.onForestMuted;

        const onPress = () => {
          const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!ativa && !event.defaultPrevented) navigateToTab(route.key);
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityState={{ selected: ativa }}
            accessibilityLabel={aba.label}
            style={[styles.item, ativa && styles.ativa]}
          >
            <Icon size={size.icon} color={cor} strokeWidth={size.stroke} />
            <Text style={[type.captionSm, { color: cor }]} numberOfLines={1} maxFontSizeMultiplier={1.3}>
              {aba.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: size.tabBarInset,
    right: size.tabBarInset,
    minHeight: size.tabBar,
    padding: space.xs + 2,
    flexDirection: 'row',
    gap: space.xxs,
    borderRadius: radius.pill,
    backgroundColor: colors.forest,
    alignSelf: 'center',
    maxWidth: size.maxContent - size.tabBarInset * 2,
  },
  item: {
    flex: 1,
    minHeight: size.touch + space.md,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.xxs,
  },
  ativa: { backgroundColor: colors.mint },
});
