// Tokens do sistema de marca Degrau. Nenhuma tela usa cor ou tamanho fora deste arquivo.
// Regra de cor 60-30-10: 60% fundo claro, 30% verde-floresta, 10% menta neon.

export const colors = {
  surface: '#F4F2EC',
  surfaceRaised: '#FFFFFF',
  surfaceSunken: '#E6E3D9',
  line: '#DCD8CC',
  ink: '#13201C',
  inkMuted: '#4F5E58',
  forest: '#0B2E26',
  forestRaised: '#145C4A',
  onForestMuted: '#A9C2B9',
  // Só preenchimento, nunca texto sobre fundo claro.
  mint: '#2CF5A6',
  onMint: '#0B2E26',
  mintSoft: '#D5FBEC',
  green: '#0E7C5F',
  // Pontos inativos do Descobrir e sombra da barra inferior.
  forestTranslucent: 'rgba(11,46,38,0.35)',
  shadow: '#0B2E26',
  transparent: 'transparent',
} as const;

// Mapa estático da Busca (fase 1). Some quando entrar o react-native-maps.
export const mapColors = {
  ground: '#E9E7DF',
  road: '#F7F5EF',
  water: '#CFE3EC',
  park: '#CFE2C9',
} as const;

export const mapShapes = {
  roadWide: 14,
  road: 12,
  roadNarrow: 10,
  park: { width: 70, height: 90 },
  parkSm: { width: 60, height: 50 },
} as const;

// Placeholders das fotos de imóvel, na ordem dos mocks.
export const photoColors = ['#C9D8CF', '#D9D2C3', '#BFD3CB', '#D6CFC0'] as const;

export const fonts = {
  soraSemiBold: 'Sora_600SemiBold',
  soraBold: 'Sora_700Bold',
  inter: 'Inter_400Regular',
  interMedium: 'Inter_500Medium',
  interSemiBold: 'Inter_600SemiBold',
} as const;

export const type = {
  display: { fontFamily: fonts.soraBold, fontSize: 40, lineHeight: 44 },
  title: { fontFamily: fonts.soraBold, fontSize: 30, lineHeight: 36 },
  heading: { fontFamily: fonts.soraBold, fontSize: 22, lineHeight: 28 },
  number: { fontFamily: fonts.soraBold, fontSize: 30, lineHeight: 34 },
  numberSm: { fontFamily: fonts.soraBold, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: fonts.inter, fontSize: 16, lineHeight: 24 },
  bodySm: { fontFamily: fonts.inter, fontSize: 14, lineHeight: 20 },
  label: { fontFamily: fonts.interSemiBold, fontSize: 15, lineHeight: 20 },
  labelSm: { fontFamily: fonts.interSemiBold, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: fonts.interMedium, fontSize: 13, lineHeight: 16 },
  captionSm: { fontFamily: fonts.interSemiBold, fontSize: 11, lineHeight: 16 },
  overline: { fontFamily: fonts.interSemiBold, fontSize: 11, lineHeight: 16, letterSpacing: 0.9 },
} as const;

export const space = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  screen: 20,
} as const;

export const radius = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  pill: 999,
} as const;

export const size = {
  touch: 44,
  button: 52,
  buttonMd: 44,
  icon: 22,
  iconSm: 16,
  iconLg: 28,
  stroke: 2,
  border: 1,
  tabBar: 72,
  tabBarInset: 12,
  tabBarBottom: 16,
  tabBarClearance: 104,
  actionBar: 84,
  photoDetail: 320,
  photoCarousel: 168,
  photoList: 200,
  photoCompact: 88,
  photoDiscover: 300,
  cardCarousel: 300,
  neighborhoodWidth: 220,
  neighborhoodHeight: 112,
  progress: 8,
  dot: 6,
  dotActive: 24,
  avatar: 40,
  confirmIcon: 88,
  decorCircle: 180,
  decorCircleSm: 120,
  mapHeight: 760,
  searchBar: 64,
  mapPin: 36,
  minScreen: 360,
  maxContent: 430,
} as const;

export const shadow = {
  tabBar: {
    shadowColor: colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  card: {
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
} as const;

export const theme = { colors, mapColors, mapShapes, photoColors, fonts, type, space, radius, size, shadow };
export default theme;
