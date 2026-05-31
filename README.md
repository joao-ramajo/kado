# Kado-to Web

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-7-007FFF?style=flat-square&logo=mui&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-2-60A5FA?style=flat-square)

Frontend do [Kado](https://kado-tan.vercel.app/dashboard) — um sistema de controle financeiro pessoal para registrar lançamentos, organizar gastos e acompanhar faturas de cartão de crédito.

---

## Sobre o projeto

O Kado nasceu de uma necessidade simples: ter clareza sobre pra onde o dinheiro vai. Esta aplicação é a camada web do projeto, responsável por traduzir a lógica da API em uma experiência de uso direta, com navegação pública, autenticação, dashboard e área de configurações.

O backend que sustenta as regras de negócio está disponível em [kado.backend](https://github.com/joao-ramajo/kado-to), e a versão publicada da interface pode ser acessada em [kado-tan.vercel.app](https://kado-tan.vercel.app/dashboard).

---

## Arquitetura

O frontend foi organizado por domínio para manter responsabilidades bem separadas e facilitar evolução incremental. A aplicação combina roteamento, estado assíncrono e contexto de autenticação sem concentrar toda a lógica na árvore principal.

- **Features** — agrupam páginas, componentes, hooks, schemas e contexto por domínio
- **Router** — controla rotas públicas e privadas da aplicação
- **API layer** — centraliza a configuração do cliente HTTP e a comunicação com o backend
- **Providers** — inicializam autenticação, cache de queries e notificações globais

### Módulos principais

| Módulo | Responsabilidade |
|---|---|
| `Auth` | Login, cadastro, persistência de sessão e proteção de rotas |
| `Dashboard` | Visualização principal da área autenticada e dados financeiros |
| `Landing` | Páginas públicas como entrada, home, guia, termos e recursos |
| `Settings` | Ajustes da conta e preferências da aplicação |
| `Components` | Layout base e componentes reutilizáveis de interface e formulários |

---

## Stack

**Runtime:** Node.js 18+ · React 19 · TypeScript 5 · Vite 7

**UI:** Material UI 7 · Tailwind CSS 4 · React Hot Toast

**Dados e formulários:** Axios · TanStack Query · React Hook Form · Zod · Day.js

**Qualidade:** Biome

**Deploy:** Vercel

---

## Rodando localmente

**Pré-requisitos:** Node.js 18+ e npm

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto e configure a URL da API:

```env
VITE_API_URL=http://localhost
```

Suba a aplicação:

```bash
npm run dev
```

O frontend ficará disponível em `http://localhost:5173`.

```bash
npm run build    # valida TypeScript e gera o bundle de produção
npm run lint     # checa o código com Biome
npm run lint:fix # aplica correções automáticas do Biome
npm run preview  # serve o build localmente
```

Se quiser iniciar o workspace completo com frontend e backend juntos, use o script na raiz do projeto:

```bash
cd ..
./start-dev.sh
```

## Licença e uso

Este projeto é público para fins de transparência, demonstração técnica e colaboração.

O código-fonte é de direito restrito. Você pode visualizar o repositório, estudar a estrutura do projeto e propor melhorias por meio de issues ou pull requests.

No entanto, não é permitido copiar, redistribuir, vender, republicar, usar comercialmente ou criar produtos derivados a partir deste código sem autorização prévia do autor.

Pull requests são bem-vindos, desde que estejam alinhados com o objetivo do projeto. Ao contribuir, você concorda que sua contribuição poderá ser incorporada ao projeto sob os mesmos termos de uso deste repositório.
