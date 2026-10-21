import { Tabs } from 'expo-router/tabs';
import { TabBar } from '@/components';
import { useAppStore } from '@/store/useAppStore';
import { colors } from '@/theme';

export default function TabsLayout() {
  const setFiltroPorFaixa = useAppStore((s) => s.setFiltroPorFaixa);

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.surface } }}
    >
      <Tabs.Screen name="index" />
      {/* Entrar em Buscar pela barra mostra todos os imóveis, sem o filtro do simulador. */}
      <Tabs.Screen name="buscar" listeners={{ tabPress: () => setFiltroPorFaixa(false) }} />
      <Tabs.Screen name="descobrir" />
      <Tabs.Screen name="minha-casa" />
      <Tabs.Screen name="mais" />
    </Tabs>
  );
}
