# Degrau — Especificação técnica do app

Fonte: https://claude.ai/artifact/KdrLBdy6jLdSznPZRjcKa7 (exportado em 2026-10-21)

O MVP do Degrau é um app mobile (iOS e Android) com 9 telas, construído a partir do protótipo navegável "Degrau — Protótipo do App". Esta especificação traduz o protótipo em telas, componentes, dados e regras para guiar a construção no Claude Code.
Visão geral e escopo
O Degrau é um marketplace de aluguel com opção de compra. O inquilino mora pagando aluguel, 30% de cada aluguel vira crédito para a entrada e o preço de compra fica travado. O proprietário anuncia o imóvel e vê perfis de interessados.
Dois perfis no mesmo app, alternados na tela inicial:
- Quero morar e comprar (inquilino): simula, busca, favorita, vê o caminho até ser dono e envia proposta.

- Quero vender (proprietário): vê o desempenho do anúncio e os perfis interessados.

Dentro do MVP (fase 1): todas as telas do protótipo navegando com dados mockados locais, simulador e cálculos funcionando, favoritos persistidos no aparelho.
Fora do MVP: login real, pagamento de aluguel, chat, agendamento de visita, contrato, upload de fotos e mapa real. Esses botões existem na interface, mas ficam desativados ou mostram "Em breve".
Stack recomendada
A recomendação é React Native com Expo e TypeScript: um código só para iOS e Android, e o Claude Code trabalha bem com essa stack.
 | Camada
 | Escolha
 | Por quê

 | App
 | Expo (SDK atual) + React Native + TypeScript
 | Um código para as duas lojas, testes no celular com Expo Go

 | Navegação
 | Expo Router (rotas por arquivo)
 | Abas inferiores e telas empilhadas sem configuração manual

 | Estilo
 | StyleSheet com um arquivo de tokens (theme.ts)
 | Tokens do sistema de marca em um só lugar

 | Fontes
 | @expo-google-fonts/sora e @expo-google-fonts/inter
 | Mesmas famílias do protótipo

 | Ícones
 | lucide-react-native
 | Traço de 2 px e pontas redondas, como pede a marca

 | Estado
 | Zustand
 | Perfil ativo, favoritos e prazo escolhido, sem boilerplate

 | Persistência local
 | AsyncStorage (via middleware do Zustand)
 | Favoritos sobrevivem ao fechar o app

 | Dados
 | Mocks em src/data/ atrás de funções api.*
 | Trocar por um backend depois sem mexer nas telas

 | Mapa (fase 2)
 | react-native-maps
 | Na fase 1 o mapa é uma imagem estática com pinos

Estrutura de pastas

```

Design tokens
Todos os valores visuais vêm de src/theme.ts; nenhuma tela usa cor ou tamanho solto. A regra de cor é 60-30-10: 60% fundo claro, 30% verde-floresta, 10% menta neon.
Cores
 | Token
 | Hex
 | Uso

 | surface
 | #F4F2EC
 | Fundo das telas

 | surfaceRaised
 | #FFFFFF
 | Cards, botões brancos, barra de ação do detalhe

 | surfaceSunken
 | #E6E3D9
 | Seletor de perfil, card "Não sabe por onde começar?"

 | line
 | #DCD8CC
 | Bordas finas e divisórias

 | ink
 | #13201C
 | Texto principal

 | inkMuted
 | #4F5E58
 | Texto de apoio

 | forest
 | #0B2E26
 | Cor-mãe: blocos escuros, barra inferior, botão secundário

 | forestRaised
 | #145C4A
 | Círculos decorativos e botão sobre forest

 | onForestMuted
 | #A9C2B9
 | Texto de apoio sobre forest

 | mint
 | #2CF5A6
 | Botão principal, aba ativa, progresso. Só preenchimento, nunca texto no claro

 | onMint
 | #0B2E26
 | Texto sobre mint

 | mintSoft
 | #D5FBEC
 | Selos e card do próximo aluguel

 | green
 | #0E7C5F
 | Links, valores positivos e progresso no claro

Tipografia
 | Estilo
 | Família
 | Tamanho / altura
 | Peso
 | Onde

 | display
 | Sora
 | 40 / 44
 | 700
 | Valor do crédito em Minha casa

 | title
 | Sora
 | 30–32 / 36–38
 | 700
 | Título das telas

 | heading
 | Sora
 | 22 / 28
 | 700
 | Títulos de seção, preço nos cards

 | number
 | Sora
 | 28–32 / 32–36
 | 700
 | Valores do simulador e preço travado

 | body
 | Inter
 | 15–16 / 24
 | 400
 | Texto corrido

 | bodySm
 | Inter
 | 14 / 20
 | 400
 | Texto de apoio

 | label
 | Inter
 | 14–16 / 20
 | 600
 | Botões e selos

 | caption
 | Inter
 | 11–13 / 16
 | 500–600
 | Legendas e rótulos da barra inferior

Espaçamento e raios
- Espaçamento em passos de 4: 4, 8, 12, 16, 20, 24, 32. Margem lateral das telas: 20.

- Raios: 16 (cards pequenos e fotos de lista), 20 (cards internos), 24 (cards de imóvel), 28 (blocos de destaque), 999 (botões, selos e barra inferior em pílula).

- Alvos de toque com no mínimo 44 px. Botões principais com 52 px de altura.

Logo
O logo é a escada de pílulas ao lado de "degrau" em Sora 600, com espaçamento de letras -0,04em.
- Três pílulas empilhadas e alinhadas à direita (larguras 7, 12 e 17 px, altura 5 px, espaço 3 px), formando degraus que sobem para a direita.

- No fundo claro: pílula de cima em green, as outras em forest, texto em ink.

- No fundo forest: pílula de cima em mint, as outras e o texto em surface.

- Implementar como componente <Logo variant="light" | "dark" size={26} /> com as pílulas em View, sem imagem.

Componentes
Doze componentes cobrem todas as telas; construa-os antes das telas, cada um em src/components/.
 | Componente
 | Props principais
 | Onde aparece

 | Logo
 | variant: 'light' | 'dark', size
 | Topo do Início e do Descobrir

 | Button
 | variant: 'primary' | 'dark' | 'outline' | 'outlineOnDark', size: 'md' | 'lg', icon?, disabled?
 | Todas as telas. primary = mint com texto forest

 | IconButton
 | icon, accessibilityLabel, variant: 'white' | 'forest'
 | Voltar, favoritar (44 px, círculo)

 | Chip
 | label, selected, onPress, onDark?
 | Faixas de aluguel do simulador, prazos 24/30/36 meses

 | Segmented
 | options, value, onChange
 | Seletor "Quero morar e comprar" / "Quero vender"

 | Badge
 | label, tone: 'mint' | 'mintSoft' | 'forest', dot?
 | "Vira seu em 30 meses", "compra R$ 520 mil", "Pré-aprovado"

 | PropertyCard
 | imovel, layout: 'carousel' | 'list' | 'compact', onPress, onFavorite
 | Carrossel do Início, lista da busca, favoritos

 | CreditCard
 | valor, meta, percentual
 | Bloco escuro de Minha casa

 | ProgressBar
 | value (0–100), onDark?
 | Crédito em Minha casa e no detalhe

 | StatTile
 | value, label, highlight?
 | Visualizações, visitas e interessados do proprietário

 | ListRow
 | icon, label, onPress, disabled?
 | Menu Mais, extrato do crédito

 | TabBar
 | 5 abas com ícone e rótulo
 | Barra inferior flutuante em pílula forest; aba ativa com fundo mint

Padrões de estado: toda imagem de imóvel tem um placeholder colorido com ícone de casa enquanto carrega; todo botão sem ação no MVP usa disabled e mostra "Em breve" ao toque.
Telas e navegação
São 5 abas na barra inferior e 4 telas empilhadas por cima delas. A barra some no detalhe do imóvel e na confirmação da proposta.
O detalhe do imóvel é o centro do fluxo: Início, Buscar, Descobrir, Favoritos e Minha casa ("Simular minha compra") abrem essa tela.
1. Início (aba)
Cabeçalho com Logo claro, seletor de cidade ("São Paulo") e botão de favoritos. Saudação "Oi, {nome}" e título que muda conforme o perfil. Segmented alterna entre inquilino e proprietário.
Perfil inquilino:
- Simulador em bloco forest: "Quanto falta para você ser dono?", 3 Chip de faixa de aluguel, resultado com o crédito em 30 meses e o valor máximo de imóvel. Botão "Ver imóveis que cabem" leva à Busca em modo lista, filtrada pela faixa.

- Carrossel horizontal "Mora agora, compra depois" com PropertyCard de 300 px e o link "Ver todos".

- Carrossel "Bairros com mais opção de compra" com cards de 220 × 112 px.

- Card "Não sabe por onde começar?" com botão "Descobrir imóveis".

Perfil proprietário: card do anúncio com 3 StatTile (visualizações, visitas, interessados), lista "Quem quer morar e comprar" com perfis anônimos e selo de status, e bloco "Tem outro imóvel parado?" com o botão "Anunciar imóvel".
2. Buscar (aba)
Dois modos, com botão flutuante para alternar: mapa (barra de busca com filtros, contador "4 imóveis com opção de compra", pinos com o valor do aluguel) e lista (título, subtítulo e PropertyCard em largura total). Tocar no pino ou no card abre o detalhe.
3. Descobrir (aba)
Tela em fundo forest, um imóvel por vez, com indicador de posição ("1 de 4") e pontos de progresso. O card mostra bairro, aluguel, preço travado e o crédito em 30 meses. Botões: "Próximo", favoritar e "Ver imóvel".
4. Minha casa (aba)
Endereço do imóvel atual, CreditCard com o crédito acumulado e a barra de progresso até a meta de entrada, dois cards (preço travado e prazo da opção), card do próximo aluguel com o botão "Pagar" (desativado no MVP), extrato mês a mês e os botões "Simular minha compra" e "Ver contrato".
5. Mais (aba)
Menu em 3 grupos: "Seu caminho até ser dono", "Para quem vende" e "Ajuda". Itens ativos no MVP: Meu crédito (vai para Minha casa), Favoritos, Anunciar imóvel (volta ao Início no perfil proprietário) e Conversas.
6. Detalhe do imóvel (empilhada)
Foto de 320 px com voltar, favoritar e contador de fotos. Tipo, rua, aluguel, condomínio e características. Bloco forest com o preço de compra travado. Seção "Seu caminho até ser dono": crédito por mês, Chip de prazo (24, 30 ou 36 meses), crédito acumulado e barra até a entrada de 20%. Barra fixa no rodapé: "Agendar visita" (desativado) e "Quero morar".
7. Proposta enviada (empilhada)
Tela forest com ícone de confirmação, prazo de resposta de 48 horas e o preço reservado. Botões "Ir para Minha casa" e "Voltar ao início".
8. Favoritos e 9. Conversas (empilhadas)
Favoritos tem estado vazio (explicação + "Descobrir imóveis") e lista compacta com o crédito em 30 meses. Conversas lista 3 canais (proprietário, corretores, Ajuda Degrau), todos sem ação no MVP.
Modelos de dados e estado
Guarde valores como números (centavos não são necessários no MVP) e formate só na tela; o protótipo guardava textos prontos como "R$ 3.400", o que não deve ser repetido.

```

Estado global (Zustand)
 | Campo
 | Tipo
 | Padrão
 | Persistido

 | perfil
 | 'inquilino' | 'proprietario'
 | 'inquilino'
 | Sim

 | favoritos
 | string[] (ids)
 | []
 | Sim

 | faixaSimulador
 | 0 | 1 | 2
 | 1
 | Não

 | modoBusca
 | 'mapa' | 'lista'
 | 'mapa'
 | Não

 | filtroPorFaixa
 | boolean
 | false
 | Não

 | indiceDescobrir
 | number
 | 0
 | Não

O prazo escolhido no detalhe (24, 30 ou 36 meses) é estado local da tela e volta para 30 a cada imóvel aberto.
Dados de exemplo
Use os 4 imóveis, 3 faixas, 3 bairros e 3 perfis do protótipo como mocks em src/data/. Exemplo: apartamento no Real Parque, aluguel de R$ 3.400, compra travada em R$ 520.000, 80 m², 3 quartos, 2 vagas.
Regras de negócio e cálculos
Todos os cálculos ficam em src/lib/credito.ts, como funções puras com testes. As telas nunca calculam nada sozinhas.
 | Regra
 | Valor no protótipo
 | Função

 | Parte do aluguel que vira crédito
 | 30%
 | creditoMensal(aluguel) = aluguel × 0,30

 | Crédito acumulado
 | por prazo escolhido
 | creditoAcumulado(aluguel, meses) = creditoMensal × meses

 | Meta de entrada
 | 20% do preço de compra
 | metaEntrada(preco) = preco × 0,20

 | Progresso até a entrada
 | limitado a 100%
 | min(100, round(crédito ÷ meta × 100))

 | Prazos oferecidos
 | 24, 30 e 36 meses (padrão 30)
 | constante PRAZOS

 | Validade da opção de compra
 | até 36 meses
 | constante PRAZO_MAXIMO_OPCAO

 | Reajuste do preço travado
 | anual pelo IPCA
 | só texto no MVP

 | Resposta à proposta
 | até 48 horas
 | só texto no MVP

Conferência com o protótipo: aluguel de R$ 3.400 gera R$ 1.020 por mês; em 30 meses, R$ 30.600. Com preço de R$ 520.000, a meta é R$ 104.000 e o progresso é 29%. Use esses números como caso de teste.
Simulador do Início: cada faixa tem um aluguel de referência (R$ 2.600, R$ 3.700 e R$ 5.200) e um imóvel máximo (R$ 400 mil, R$ 650 mil e R$ 900 mil). O resultado é creditoAcumulado(aluguelReferencia, 30).
Formatação: valores em reais com Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }). Valores curtos nos selos e pinos: "R$ 520 mil" e "R$ 3,4 mil".
Regras da marca nos textos: todo valor em dinheiro aparece com "R$"; botões começam com verbo; sem ponto de exclamação nos textos do sistema; nenhuma promessa que não esteja no contrato.
Questões em aberto: o percentual de 30%, a entrada de 20% e o prazo de 36 meses vêm do protótipo e precisam ser confirmados no modelo comercial antes da fase 2. Deixe-os como constantes configuráveis.
Acessibilidade e critérios de aceite
O MVP está pronto quando toda a navegação do protótipo funciona no celular, os cálculos passam nos testes e as regras abaixo são cumpridas.
- Todas as 9 telas navegam como no protótipo, nos dois perfis

- Favoritos persistem depois de fechar e reabrir o app

- credito.ts com testes passando, incluindo o caso de R$ 3.400 e R$ 520.000

- Nenhuma cor ou tamanho fora de theme.ts

- Contraste de texto de pelo menos 4,5:1 (mint nunca como texto sobre fundo claro)

- Alvos de toque com no mínimo 44 × 44 px

- Botões só com ícone têm accessibilityLabel ("Voltar", "Salvar nos favoritos")

- Textos respeitam o tamanho de fonte do sistema sem cortar valores

- Funciona em telas de 360 a 430 px de largura

Ordem de construção com o Claude Code
Peça uma etapa por vez e teste no celular com o Expo Go antes de seguir.
- Criar o projeto Expo com TypeScript e Expo Router, instalar as dependências da stack.

- Criar theme.ts com os tokens e carregar as fontes Sora e Inter.

- Criar credito.ts com os testes da seção de regras.

- Criar os mocks em src/data/ e a store do Zustand com persistência.

- Construir os componentes, começando por Logo, Button, Chip, Badge e PropertyCard.

- Montar a TabBar e as 5 abas vazias.

- Construir o Início (perfil inquilino, depois proprietário).

- Construir o Detalhe do imóvel e a Proposta enviada.

- Construir Buscar (lista primeiro, mapa estático depois), Descobrir, Minha casa e Mais.

- Construir Favoritos e Conversas, e revisar os critérios de aceite.

Primeira mensagem sugerida para o Claude Code: "Vou construir o app Degrau seguindo a especificação técnica abaixo. Comece pelas etapas 1 a 3 da ordem de construção e me mostre como rodar no Expo Go." Cole esta especificação logo depois, ou exporte o documento em Markdown e salve como SPEC.md na raiz do projeto.
