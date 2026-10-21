import { ChevronRight, type LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { emBreve } from '@/store/useToast';
import { colors, radius, size, space, type } from '@/theme';

interface ListRowProps {
  label: string;
  icon?: LucideIcon;
  description?: string;
  /** Valor à direita (extrato). Sem onPress a linha é só informativa. */
  value?: string;
  onPress?: () => void;
  /** Sem ação no MVP: responde "Em breve". */
  disabled?: boolean;
  divider?: boolean;
}

export function ListRow({ label, icon: Icon, description, value, onPress, disabled, divider }: ListRowProps) {
  const interativo = !!onPress || !!disabled;
  const conteudo = (
    <>
      {Icon ? (
        <View style={styles.icone}>
          <Icon size={size.icon - 2} color={colors.forest} strokeWidth={size.stroke} />
        </View>
      ) : null}
      <View style={styles.textos}>
        <Text style={[type.label, styles.label, disabled && styles.muted]}>{label}</Text>
        {description ? <Text style={[type.bodySm, styles.muted]}>{description}</Text> : null}
      </View>
      {value ? <Text style={[type.label, styles.valor]}>{value}</Text> : null}
      {interativo && !value ? (
        <ChevronRight size={size.iconSm + 2} color={colors.inkMuted} strokeWidth={size.stroke} />
      ) : null}
    </>
  );

  const estilo = [styles.row, divider && styles.divider];

  if (!interativo) {
    return (
      <View style={estilo} accessible>
        {conteudo}
      </View>
    );
  }

  return (
    <Pressable
      onPress={disabled ? emBreve : onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      accessibilityHint={disabled ? 'Em breve' : undefined}
      style={({ pressed }) => [...estilo, pressed && styles.pressed]}
    >
      {conteudo}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    minHeight: size.touch + space.md,
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
  },
  divider: { borderTopWidth: size.border, borderTopColor: colors.line },
  icone: {
    width: size.touch - 4,
    height: size.touch - 4,
    borderRadius: radius.pill,
    backgroundColor: colors.mintSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: { flex: 1, gap: space.xxs },
  label: { color: colors.ink },
  muted: { color: colors.inkMuted },
  valor: { color: colors.green },
  pressed: { backgroundColor: colors.surface },
});
