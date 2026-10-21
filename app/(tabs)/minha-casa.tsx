import { router } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Button, CreditCard, ListRow, Screen } from '@/components';
import { api } from '@/data/api';
import { metaEntrada, PERCENTUAL_CREDITO, progressoEntrada } from '@/lib/credito';
import {
  formatarDiaMes,
  formatarMesAno,
  formatarMesPorExtenso,
  formatarMoeda,
  hojeIso,
  mesesEntre,
} from '@/lib/formato';
import { colors, radius, size, space, type } from '@/theme';

export default function MinhaCasaScreen() {
  const contrato = api.contratoAtual();
  const imovel = api.imovel(contrato.imovelId);
  if (!imovel) return null;

  const meta = metaEntrada(imovel.precoCompra);
  const faltam = mesesEntre(hojeIso(), contrato.opcaoAte);

  return (
    <Screen>
      <View style={styles.gapXs}>
        <Text style={[type.title, styles.ink]} accessibilityRole="header">
          Minha casa
        </Text>
        <View style={styles.linha}>
          <MapPin size={size.iconSm} color={colors.inkMuted} strokeWidth={size.stroke} />
          <Text style={[type.bodySm, styles.muted]}>
            {imovel.rua}, {imovel.bairro}
          </Text>
        </View>
      </View>

      <CreditCard valor={contrato.creditoAcumulado} meta={meta} percentual={progressoEntrada(contrato.creditoAcumulado, imovel.precoCompra)} />

      <View style={styles.dupla}>
        <View style={styles.mini}>
          <Text style={[type.caption, styles.muted]}>Preço travado</Text>
          <Text style={[type.numberSm, styles.ink]}>{formatarMoeda(imovel.precoCompra)}</Text>
          <Text style={[type.caption, styles.muted]}>reajuste pelo IPCA</Text>
        </View>
        <View style={styles.mini}>
          <Text style={[type.caption, styles.muted]}>Opção de compra até</Text>
          <Text style={[type.numberSm, styles.ink]}>{formatarMesAno(contrato.opcaoAte)}</Text>
          <Text style={[type.caption, styles.muted]}>faltam {faltam} meses</Text>
        </View>
      </View>

      <View style={styles.proximo}>
        <View style={styles.flex}>
          <Text style={[type.caption, styles.forest]}>Próximo aluguel</Text>
          <Text style={[type.label, styles.forest]}>
            {formatarMoeda(imovel.aluguel)} · vence {formatarDiaMes(contrato.proximoVencimento)}
          </Text>
        </View>
        <Button label="Pagar" variant="dark" size="md" disabled />
      </View>

      <View style={styles.gapSm}>
        <View style={styles.extratoHeader}>
          <Text style={[type.heading, styles.ink]} accessibilityRole="header">
            Extrato do crédito
          </Text>
          <Text style={[type.bodySm, styles.muted]}>{Math.round(PERCENTUAL_CREDITO * 100)}% de cada aluguel</Text>
        </View>
        <View style={styles.extrato}>
          {contrato.extrato.map((e, i) => (
            <ListRow
              key={e.mes}
              label={formatarMesPorExtenso(e.mes)}
              description={e.status === 'em dia' ? 'Aluguel pago em dia' : 'Aluguel em atraso'}
              value={`+ ${formatarMoeda(e.valor)}`}
              divider={i > 0}
            />
          ))}
        </View>
        <Text style={[type.bodySm, styles.muted, styles.centro]}>e mais {contrato.mesesAnteriores} meses anteriores</Text>
      </View>

      <View style={styles.gapSm}>
        <Button label="Simular minha compra" onPress={() => router.push(`/imovel/${imovel.id}`)} />
        <Button label="Ver contrato" variant="outline" disabled />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  gapXs: { gap: space.xs },
  gapSm: { gap: space.md },
  linha: { flexDirection: 'row', alignItems: 'center', gap: space.xs },
  dupla: { flexDirection: 'row', gap: space.md },
  mini: { flex: 1, backgroundColor: colors.surfaceRaised, borderRadius: radius.md, padding: space.lg, gap: space.xs },
  proximo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: space.md,
    backgroundColor: colors.mintSoft,
    borderRadius: radius.md,
    padding: space.lg,
  },
  extratoHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: space.sm },
  extrato: { backgroundColor: colors.surfaceRaised, borderRadius: radius.md, overflow: 'hidden' },
  centro: { textAlign: 'center' },
  ink: { color: colors.ink },
  muted: { color: colors.inkMuted },
  forest: { color: colors.forest },
});
