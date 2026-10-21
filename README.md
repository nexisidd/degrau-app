# Degrau

App mobile (iOS e Android) do marketplace de aluguel com opção de compra. Fase 1 do MVP: todas as 9 telas do protótipo com dados mockados locais, simulador e cálculos funcionando e favoritos salvos no aparelho. A especificação completa está em [SPEC.md](SPEC.md).

## Rodar no celular

```bash
npm install
npx expo start
```

Abra o app **Expo Go** no celular e leia o QR code (no iPhone, pela câmera). Celular e computador precisam estar na mesma rede Wi-Fi; se não estiverem, use `npx expo start --tunnel`.

Outros comandos:

```bash
npm test            # testes de src/lib (credito.ts e formato.ts)
npm run typecheck   # TypeScript
npx expo start --web
```

## Stack

Expo SDK 58 + React Native + TypeScript, Expo Router, Zustand com AsyncStorage, `lucide-react-native`, fontes Sora e Inter.

## Estrutura

```
app/
  _layout.tsx            # fontes, área segura, pilha de telas, aviso "Em breve"
  (tabs)/                # Início, Buscar, Descobrir, Minha casa, Mais
  imovel/[id].tsx        # Detalhe do imóvel
  proposta-enviada.tsx
  favoritos.tsx
  conversas.tsx
src/
  theme.ts               # todos os tokens (cores, tipografia, espaçamento, raios, tamanhos)
  components/            # os 12 componentes da especificação + Screen, PhotoPlaceholder, Toast
  data/                  # tipos, mocks e api.* (troca por backend na fase 2)
  lib/credito.ts         # regras do crédito, com testes
  lib/formato.ts         # moeda, datas e textos curtos, com testes
  lib/mapa.ts            # pinos do mapa estático
  store/                 # Zustand: estado do app e aviso "Em breve"
```

## Regras que o código segue

- Nenhuma tela calcula: todo cálculo está em `src/lib/credito.ts`. Os percentuais (30% e 20%) e os prazos (24/30/36 meses) são constantes, porque ainda dependem do modelo comercial.
- Os dados guardam números e a formatação só acontece na tela (`src/lib/formato.ts`).
- Nenhuma cor ou tamanho fica fora de `src/theme.ts`.
- Todo botão sem ação no MVP aparece esmaecido e mostra "Em breve" ao toque.
