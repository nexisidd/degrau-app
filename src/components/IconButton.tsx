import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { colors, radius, shadow, size } from '@/theme';

interface IconButtonProps {
  icon: LucideIcon;
  accessibilityLabel: string;
  onPress?: () => void;
  variant?: 'white' | 'forest';
  /** Preenche o ícone (coração dos favoritos). */
  filled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Botão redondo de 44 px só com ícone: voltar, favoritar. */
export function IconButton({ icon: Icon, accessibilityLabel, onPress, variant = 'white', filled, style }: IconButtonProps) {
  const bg = variant === 'white' ? colors.surfaceRaised : colors.forestRaised;
  const fg = variant === 'white' ? colors.ink : colors.surface;
  const fill = filled ? (variant === 'white' ? colors.forest : colors.mint) : 'none';
  const stroke = filled && variant === 'forest' ? colors.mint : fg;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={4}
      style={({ pressed }) => [styles.base, { backgroundColor: bg }, variant === 'white' && shadow.card, pressed && styles.pressed, style]}
    >
      <Icon size={size.icon} color={stroke} fill={fill} strokeWidth={size.stroke} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: size.touch,
    height: size.touch,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.8 },
});
