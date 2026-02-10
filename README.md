# Rocketseat - Financy

## Projeto da Pós-graduação Tech Developer 360 da Faculdade de Tecnologia Rocketseat

Projeto FullStack de gerenciamento de finanças. O objetivo é permitir a organização financeira com gestão de transações e categorias.  
Briefing e layout: https://efficient-sloth-d85.notion.site/Desafio-Fase-3-Financy-2ca395da5770806ba9c5fba5cc3f681a  
Figma: https://www.figma.com/community/file/1580994817007013257

**Requisitos do desafio**

- O usuário pode criar uma conta e fazer login
- O usuário pode ver e gerenciar apenas as transações e categorias criadas por ele
- Deve ser possível criar uma transação
- Deve ser possível deletar uma transação
- Deve ser possível editar uma transação
- Deve ser possível listar todas as transações
- Deve ser possível criar uma categoria
- Deve ser possível deletar uma categoria
- Deve ser possível editar uma categoria
- Deve ser possível listar todas as categorias

**Back-end**

- Banco de dados esperado: SQLite (Postgres opcional)
- Ferramentas obrigatórias: TypeScript e GraphQL
- API para gerenciar finanças

**Front-end**

- Obrigatório: React + GraphQL + Vite (bundler)
- Seguir o layout do Figma o mais fielmente possível
- A aplicação possui 6 páginas e 2 modais (formulários via Dialog)

**Entrega**

- Repositório público no GitHub
- Envio do link do repositório na plataforma do desafio

**Stack do projeto (implementação atual)**

- Front-end: React, Vite, Tailwind CSS, Apollo Client, React Router
- Back-end: Node.js, TypeScript, Apollo Server, Express, Prisma, libSQL

**Como rodar**

1. Back-end

```bash
cd backend
npm install
npm run dev
```

Crie `backend/.env` com as variáveis abaixo antes de iniciar. 2. Front-end

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

**Variáveis de ambiente**
Back-end (`backend/.env`):

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta"
```

Front-end (`frontend/.env`):

```
VITE_GRAPHQL_HTTP_URL=/graphql
```

**Observações**

- O front-end usa proxy do Vite para `/graphql` apontando para `http://localhost:4000`.
