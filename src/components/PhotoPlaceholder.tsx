import { House } from 'lucide-react-native';
import { useState } from 'react';
import { Image, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import type { Imovel } from '@/data/tipos';
import { colors, photoColors, size } from '@/theme';

interface PhotoPlaceholderProps {
  imovel: Imovel;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
}

/** Foto do imóvel. Enquanto carrega (ou sem foto, como no MVP), mostra cor + ícone de casa. */
export function PhotoPlaceholder({ imovel, style, iconSize = size.iconLg }: PhotoPlaceholderProps) {
  const [carregou, setCarregou] = useState(false);
  const indice = Math.max(0, Number(imovel.id.replace(/\D/g, '')) - 1) % photoColors.length;
  const foto = imovel.fotos[0];

  return (
    <View style={[styles.base, { backgroundColor: photoColors[indice] }, style]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {!carregou ? <House size={iconSize} color={colors.forest} strokeWidth={size.stroke} opacity={0.45} /> : null}
      {foto ? <Image source={{ uri: foto }} style={StyleSheet.absoluteFill} onLoad={() => setCarregou(true)} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
});
