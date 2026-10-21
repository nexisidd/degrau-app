import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Perfil = 'inquilino' | 'proprietario';
export type ModoBusca = 'mapa' | 'lista';
export type IndiceFaixa = 0 | 1 | 2;

interface AppState {
  perfil: Perfil;
  favoritos: string[];
  faixaSimulador: IndiceFaixa;
  modoBusca: ModoBusca;
  filtroPorFaixa: boolean;
  indiceDescobrir: number;
  setPerfil: (perfil: Perfil) => void;
  alternarFavorito: (id: string) => void;
  setFaixaSimulador: (faixa: IndiceFaixa) => void;
  setModoBusca: (modo: ModoBusca) => void;
  setFiltroPorFaixa: (ativo: boolean) => void;
  proximoDescobrir: (total: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      perfil: 'inquilino',
      favoritos: [],
      faixaSimulador: 1,
      modoBusca: 'mapa',
      filtroPorFaixa: false,
      indiceDescobrir: 0,
      setPerfil: (perfil) => set({ perfil }),
      alternarFavorito: (id) =>
        set((s) => ({
          favoritos: s.favoritos.includes(id) ? s.favoritos.filter((f) => f !== id) : [...s.favoritos, id],
        })),
      setFaixaSimulador: (faixaSimulador) => set({ faixaSimulador }),
      setModoBusca: (modoBusca) => set({ modoBusca }),
      setFiltroPorFaixa: (filtroPorFaixa) => set({ filtroPorFaixa }),
      proximoDescobrir: (total) => set((s) => ({ indiceDescobrir: (s.indiceDescobrir + 1) % total })),
    }),
    {
      name: 'degrau-app',
      storage: createJSONStorage(() => AsyncStorage),
      // Só perfil e favoritos sobrevivem ao fechar o app.
      partialize: (s) => ({ perfil: s.perfil, favoritos: s.favoritos }),
    },
  ),
);

export const useEhFavorito = (id: string) => useAppStore((s) => s.favoritos.includes(id));
