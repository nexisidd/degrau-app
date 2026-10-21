import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, space, type } from '@/theme';

interface StatTileProps {
  value: string | number;
  label: string;
  highlight?: boolean;
}

export function StatTile({ value, label, highlight }: StatTileProps) {
  return (
    <View style={[styles.tile, highlight && styles.highlight]} accessible accessibilityLabel={`${value} ${label}`}>
      <Text style={[type.heading, styles.valor]}>{value}</Text>
      <Text style={[type.caption, styles.label]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 'auto',
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingVertical: space.md,
    paddingHorizontal: space.md,
    gap: space.xxs,
  },
  highlight: { backgroundColor: colors.mint },
  valor: { color: colors.ink },
  label: { color: colors.ink },
});
