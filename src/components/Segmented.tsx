import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, size, space, type } from '@/theme';

interface SegmentedProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

export function Segmented<T extends string>({ options, value, onChange }: SegmentedProps<T>) {
  return (
    <View style={styles.track} accessibilityRole="tablist">
      {options.map((o) => {
        const ativo = o.value === value;
        return (
          <Pressable
            key={o.value}
            onPress={() => onChange(o.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected: ativo }}
            style={[styles.item, ativo && styles.ativo]}
          >
            <Text style={[type.labelSm, styles.texto]} numberOfLines={2}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSunken,
    borderRadius: radius.pill,
    padding: space.xs,
    gap: space.xs,
  },
  item: {
    flex: 1,
    minHeight: size.touch,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.sm,
  },
  ativo: { backgroundColor: colors.surfaceRaised },
  texto: { color: colors.ink, textAlign: 'center' },
});
