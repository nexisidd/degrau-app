import { StyleSheet, View } from 'react-native';
import { colors, radius, size } from '@/theme';

interface ProgressBarProps {
  /** 0 a 100 */
  value: number;
  onDark?: boolean;
  accessibilityLabel?: string;
}

export function ProgressBar({ value, onDark, accessibilityLabel }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: pct }}
      style={[styles.track, { backgroundColor: onDark ? colors.forestRaised : colors.line }]}
    >
      <View style={[styles.fill, { width: `${pct}%`, backgroundColor: onDark ? colors.mint : colors.green }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: size.progress, borderRadius: radius.pill, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radius.pill },
});
