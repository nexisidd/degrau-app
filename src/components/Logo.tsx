import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/theme';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: number;
}

// Medidas de referência da marca para size = 26.
const BASE = 26;
const PILULAS = [7, 12, 17];
const ALTURA = 5;
const ESPACO = 3;

/** Escada de pílulas + "degrau". light = sobre fundo claro, dark = sobre forest. */
export function Logo({ variant = 'light', size = BASE }: LogoProps) {
  const k = size / BASE;
  const topo = variant === 'light' ? colors.green : colors.mint;
  const resto = variant === 'light' ? colors.forest : colors.surface;
  const texto = variant === 'light' ? colors.ink : colors.surface;

  return (
    <View style={styles.row} accessible accessibilityRole="image" accessibilityLabel="degrau">
      <View style={[styles.escada, { gap: ESPACO * k }]}>
        {PILULAS.map((w, i) => (
          <View
            key={w}
            style={{
              width: w * k,
              height: ALTURA * k,
              borderRadius: ALTURA * k,
              backgroundColor: i === 0 ? topo : resto,
            }}
          />
        ))}
      </View>
      <Text
        style={[styles.texto, { color: texto, fontSize: size, lineHeight: size * 1.15, letterSpacing: -0.04 * size, marginLeft: 6 * k }]}
        allowFontScaling={false}
      >
        degrau
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  escada: { alignItems: 'flex-end' },
  texto: { fontFamily: fonts.soraSemiBold },
});
