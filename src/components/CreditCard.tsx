import { StyleSheet, Text, View } from 'react-native';
import { formatarMoeda } from '@/lib/formato';
import { colors, radius, size, space, type } from '@/theme';
import { ProgressBar } from './ProgressBar';

interface CreditCardProps {
  valor: number;
  meta: number;
  /** 0 a 100, já calculado em credito.ts */
  percentual: number;
}

/** Bloco escuro de Minha casa: crédito acumulado e progresso até a entrada. */
export function CreditCard({ valor, meta, percentual }: CreditCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.decor} />
      <Text style={[type.labelSm, styles.label]}>Crédito para a entrada</Text>
      <Text style={[type.display, styles.valor]}>{formatarMoeda(valor)}</Text>
      <ProgressBar value={percentual} onDark accessibilityLabel={`${percentual}% da meta de entrada`} />
      <View style={styles.rodape}>
        <Text style={[type.labelSm, styles.destaque]}>{percentual}% da meta</Text>
        <Text style={[type.bodySm, styles.label]}>Meta {formatarMoeda(meta)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.forest,
    borderRadius: radius.xl,
    padding: space.xxl,
    gap: space.md,
    overflow: 'hidden',
  },
  decor: {
    position: 'absolute',
    right: -size.decorCircleSm / 3,
    top: -size.decorCircleSm / 3,
    width: size.decorCircleSm,
    height: size.decorCircleSm,
    borderRadius: radius.pill,
    backgroundColor: colors.forestRaised,
  },
  label: { color: colors.onForestMuted },
  valor: { color: colors.surface },
  rodape: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: space.sm },
  destaque: { color: colors.mint },
});
