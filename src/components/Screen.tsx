import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, size, space } from '@/theme';

interface ScreenProps {
  children: ReactNode;
  /** Fundo forest (Descobrir, Proposta enviada). */
  dark?: boolean;
  /** Reserva espaço para a barra inferior flutuante. */
  withTabBar?: boolean;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}

/** Contêiner padrão das telas: área segura, margem lateral de 20 e largura de 360 a 430. */
export function Screen({ children, dark, withTabBar = true, scroll = true, contentStyle }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const bg = dark ? colors.forest : colors.surface;
  const padding = {
    paddingTop: insets.top + space.md,
    paddingBottom: (withTabBar ? size.tabBarClearance : space.xxl) + insets.bottom,
  };

  if (!scroll) {
    return (
      <View style={[styles.flex, { backgroundColor: bg }]}>
        <View style={[styles.content, padding, styles.flex, contentStyle]}>{children}</View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.flex, { backgroundColor: bg }]} contentContainerStyle={[styles.content, padding, contentStyle]}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    paddingHorizontal: space.screen,
    gap: space.xxl,
    width: '100%',
    maxWidth: size.maxContent,
    alignSelf: 'center',
  },
});
