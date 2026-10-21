import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { emBreve } from '@/store/useToast';
import { colors, radius, size, space, type } from '@/theme';

export type ButtonVariant = 'primary' | 'dark' | 'outline' | 'outlineOnDark';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: 'md' | 'lg';
  icon?: LucideIcon;
  /** Sem ação no MVP: fica esmaecido e responde "Em breve" ao toque. */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const variants: Record<ButtonVariant, { bg: string; fg: string; border: string }> = {
  primary: { bg: colors.mint, fg: colors.onMint, border: colors.mint },
  dark: { bg: colors.forest, fg: colors.surface, border: colors.forest },
  outline: { bg: colors.transparent, fg: colors.ink, border: colors.ink },
  outlineOnDark: { bg: colors.transparent, fg: colors.surface, border: colors.onForestMuted },
};

export function Button({ label, onPress, variant = 'primary', size: tamanho = 'lg', icon: Icon, disabled, style }: ButtonProps) {
  const v = variants[variant];
  return (
    <Pressable
      onPress={disabled ? emBreve : onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      accessibilityHint={disabled ? 'Em breve' : undefined}
      style={({ pressed }) => [
        styles.base,
        { minHeight: tamanho === 'lg' ? size.button : size.buttonMd, backgroundColor: v.bg, borderColor: v.border },
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <View style={styles.content}>
        <Text style={[tamanho === 'lg' ? type.label : type.labelSm, { color: v.fg }]}>{label}</Text>
        {Icon ? <Icon size={size.iconSm + 2} color={v.fg} strokeWidth={size.stroke} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.pill,
    borderWidth: size.border,
    paddingHorizontal: space.xl,
    paddingVertical: space.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.85 },
});
