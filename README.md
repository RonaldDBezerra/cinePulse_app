# 🎬 CinePulse

Aplicativo mobile para explorar filmes e séries, com dados em tempo real da API do TMDB. Desenvolvido com **React Native**, **Expo** e **Firebase Authentication**.

---

## � Screenshots

<p align="center">
  <img src="./asserts/screenshots/login.jpeg" width="220" />
  <img src="./asserts/screenshots/register.jpeg" width="220" />
  <img src="./asserts/screenshots/reset.jpeg" width="220" />
</p>

<p align="center">
  <img src="./asserts/screenshots/filmes.jpeg" width="220" />
  <img src="./asserts/screenshots/series.jpeg" width="220" />
  <img src="./asserts/screenshots/details.jpeg" width="220" />

  <img src="./asserts/screenshots/configuracoes.jpeg" width="220" />

  <img src="./asserts/screenshots/navegacaoLateral.jpeg" width="220" />
</p>

---

## �📱 Funcionalidades

- **Autenticação completa** — Login, cadastro, recuperação de senha e exclusão de conta via Firebase
- **Catálogo de Filmes** — Populares, bem avaliados e em exibição nos cinemas
- **Catálogo de Séries** — Populares, bem avaliadas e em exibição hoje
- **Detalhes** — Sinopse, nota, gêneros, duração/episódios, status e idioma
- **Paginação infinita** — Carregamento sob demanda ao rolar as listas
- **Animações fluidas** — Transições com Moti e React Native Reanimated
- **Skeleton loading** — Carregamento visual enquanto os dados são buscados
- **Tema escuro** — Interface dark com destaque em vermelho (#E50914)
- **Navegação Drawer** — Menu lateral com acesso rápido às seções

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| [Expo SDK 54](https://expo.dev/) | Framework e build |
| [React Native](https://reactnative.dev/) | Interface nativa |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Expo Router](https://docs.expo.dev/router/introduction/) | Navegação file-based (Stack + Drawer) |
| [Firebase Auth](https://firebase.google.com/docs/auth) | Autenticação com email/senha |
| [TMDB API](https://www.themoviedb.org/documentation/api) | Dados de filmes e séries |
| [Moti](https://moti.fyi/) | Animações declarativas |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | Animações de alta performance |
| [Axios](https://axios-http.com/) | Requisições HTTP |

---

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── _layout.tsx              # Layout raiz (AuthProvider + StatusBar)
│   ├── login.tsx                # Tela de login
│   ├── register.tsx             # Tela de cadastro
│   ├── reset.tsx                # Tela de recuperação de senha
│   └── (protected)/
│       ├── _layout.tsx          # Layout protegido (redireciona se não autenticado)
│       ├── (drawer)/
│       │   ├── _layout.tsx      # Layout do Drawer
│       │   ├── index.tsx        # Home
│       │   ├── filmes.tsx       # Catálogo de filmes
│       │   ├── series.tsx       # Catálogo de séries
│       │   └── settings.tsx     # Configurações
│       └── (stack_routes)/
│           ├── about.tsx        # Sobre o app
│           ├── delete-account.tsx
│           └── details/[id]/    # Detalhes do filme/série
├── components/
│   ├── ContentCards.tsx         # Cards horizontais de conteúdo
│   ├── CustomDrawer.tsx         # Drawer personalizado
│   ├── DetailsSkeleton.tsx      # Skeleton da tela de detalhes
│   ├── HomeSkeleton.tsx         # Skeleton da tela principal
│   └── Separator.tsx            # Separador visual
├── context/
│   └── authContext.tsx           # Context de autenticação
├── services/
│   ├── auth.ts                  # Funções de autenticação (login, register, logout...)
│   ├── firebase.ts              # Configuração do Firebase
│   └── tmdb.ts                  # Chamadas à API do TMDB
├── styles/
│   └── colors.ts                # Paleta de cores do app
└── types/
    └── firebase-auth.d.ts       # Tipagens do Firebase Auth
```

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Conta no [Firebase](https://console.firebase.google.com/) com Authentication habilitado
- Chave de API do [TMDB](https://www.themoviedb.org/settings/api)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/cinepulse.git
cd cinepulse

# Instale as dependências
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_API_KEY_TMDB=sua_chave_tmdb

EXPO_PUBLIC_API_KEY_FIREBASE=sua_chave_firebase
EXPO_PUBLIC_AUTH_DOMAIN=seu_projeto.firebaseapp.com
EXPO_PUBLIC_PROJECT_ID=seu_projeto
EXPO_PUBLIC_STORAGE_BUCKET=seu_projeto.firebasestorage.app
EXPO_PUBLIC_MESSAGING_SENDER_ID=000000000000
EXPO_PUBLIC_APP_ID=1:000000000000:web:xxxxxxxxxxxxxx
```

### Executar

```bash
# Iniciar o servidor de desenvolvimento
npx expo start

# Android
npx expo start --android

# iOS
npx expo start --ios
```

### Build (EAS)

```bash
# APK para testes
eas build --profile preview --platform android

# Build de produção
eas build --profile production --platform android
```

---

## 📄 Licença

Este projeto é pessoal e de uso educacional.

---

<p align="center">
  Feito por <strong>Ronald Dev</strong>
</p>
