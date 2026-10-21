import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from '@/store/useToast';
import { colors, radius, size, space, type } from '@/theme';

/** Aviso curto ("Em breve") acima da barra inferior. */
export function Toast() {
  const mensagem = useToast((s) => s.mensagem);
  const insets = useSafeAreaInsets();
  if (!mensagem) return null;

  return (
    <View pointerEvents="none" style={[styles.wrap, { bottom: insets.bottom + size.tabBarClearance }]}>
      <View style={styles.toast} accessibilityLiveRegion="polite" accessibilityRole="alert">
        <Text style={[type.labelSm, styles.texto]}>{mensagem}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  toast: {
    backgroundColor: colors.ink,
    borderRadius: radius.pill,
    paddingHorizontal: space.xl,
    paddingVertical: space.md,
  },
  texto: { color: colors.surface },
});
