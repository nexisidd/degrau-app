import { create } from 'zustand';

interface ToastState {
  mensagem: string | null;
  mostrar: (mensagem: string) => void;
  esconder: () => void;
}

let timer: ReturnType<typeof setTimeout> | undefined;

export const useToast = create<ToastState>((set) => ({
  mensagem: null,
  mostrar: (mensagem) => {
    if (timer) clearTimeout(timer);
    set({ mensagem });
    timer = setTimeout(() => set({ mensagem: null }), 2000);
  },
  esconder: () => set({ mensagem: null }),
}));

/** Resposta padrão de todo botão que ainda não tem ação no MVP. */
export const emBreve = () => useToast.getState().mostrar('Em breve');
