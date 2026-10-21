import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, size, space, type } from '@/theme';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  onDark?: boolean;
}

/** Opção de escolha única: faixas de aluguel e prazos 24/30/36 meses. */
export function Chip({ label, selected, onPress, onDark }: ChipProps) {
  const c = onDark
    ? selected
      ? { bg: colors.mint, fg: colors.onMint, border: colors.mint }
      : { bg: colors.transparent, fg: colors.surface, border: colors.onForestMuted }
    : selected
      ? { bg: colors.forest, fg: colors.surface, border: colors.forest }
      : { bg: colors.surfaceRaised, fg: colors.ink, border: colors.line };

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      style={({ pressed }) => [styles.base, { backgroundColor: c.bg, borderColor: c.border }, pressed && styles.pressed]}
    >
      <Text style={[type.labelSm, { color: c.fg }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: size.touch,
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
    borderRadius: radius.pill,
    borderWidth: size.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.85 },
});
