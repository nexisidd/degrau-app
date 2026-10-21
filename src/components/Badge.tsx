import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, radius, space, type } from '@/theme';

interface BadgeProps {
  label: string;
  tone?: 'mint' | 'mintSoft' | 'forest';
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
}

const tones = {
  mint: { bg: colors.mint, fg: colors.onMint, dot: colors.forest },
  mintSoft: { bg: colors.mintSoft, fg: colors.forest, dot: colors.green },
  forest: { bg: colors.forest, fg: colors.surface, dot: colors.mint },
} as const;

export function Badge({ label, tone = 'mintSoft', dot, style }: BadgeProps) {
  const t = tones[tone];
  return (
    <View style={[styles.base, { backgroundColor: t.bg }, style]}>
      {dot ? <View style={[styles.dot, { backgroundColor: t.dot }]} /> : null}
      <Text style={[type.caption, styles.texto, { color: t.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: space.xs + 2,
    paddingHorizontal: space.md,
    paddingVertical: space.xs + 2,
    borderRadius: radius.pill,
  },
  dot: { width: space.sm - 2, height: space.sm - 2, borderRadius: radius.pill },
  texto: { fontFamily: type.labelSm.fontFamily },
});
