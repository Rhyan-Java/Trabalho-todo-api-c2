<<<<<<< HEAD
# Todo API C2 - Task Manager

API REST completa desenvolvida para o Projeto Prático da C2, utilizando **Node.js**, **TypeScript**, **Express**, **Prisma ORM** e **SQLite**.

O sistema permite autenticação com **JWT**, gerenciamento de **usuários**, **projetos** e **tarefas**, com controle de permissões (**USER/ADMIN**), proteção de rotas e validação de dados utilizando **Zod**.

---

# Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- JWT (JSON Web Token)
- bcrypt
- Zod
- Vitest
- Supertest

---

# Funcionalidades

## Autenticação

- Cadastro de usuários
- Login com JWT
- Usuário autenticado (`/auth/me`)
- Proteção de rotas com Bearer Token

## Usuários

- Criar usuário
- Listar usuários
- Buscar usuário por ID
- Atualizar usuário
- Deletar usuário (**ADMIN apenas**)

## Projetos

- Criar projeto
- Listar projetos do usuário autenticado
- Buscar projeto por ID
- Atualizar projeto
- Deletar projeto

### Controle de propriedade

Cada usuário pode acessar **somente seus próprios projetos**.

## Tarefas

- Criar tarefa
- Listar tarefas do projeto
- Atualizar tarefa
- Deletar tarefa

### Controle de propriedade

O usuário só pode manipular tarefas pertencentes aos seus projetos.

---

# Entidades do Sistema

## User

```ts
User {
  id
  name
  email
  password
  role
  createdAt
}
```

## Project

```ts
Project {
  id
  title
  description
  userId
  createdAt
}
```

## Task

```ts
Task {
  id
  title
  done
  projectId
  createdAt
}
```

---

# Relacionamentos

```txt
User
 └── Projects
      └── Tasks
```

- Um usuário possui vários projetos.
- Um projeto possui várias tarefas.

---

# Configuração do Projeto

## 1. Clonar repositório

```bash
git clone <url-do-repositorio>
```

## 2. Instalar dependências

```bash
npm install
```

## 3. Configurar variáveis de ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
```

Ou utilize:

```txt
.env.example
```

---

## 4. Rodar migrations

```bash
npx prisma migrate dev
```

---

## 5. Gerar Prisma Client

```bash
npx prisma generate
```

---

## 6. Rodar projeto

```bash
npm run dev
```

Servidor:

```txt
http://localhost:3000
```

---

# Autenticação JWT

Para acessar rotas protegidas:

1. Faça login:

```http
POST /auth/login
```

2. Copie o token retornado.

3. Utilize no Header:

```txt
Authorization: Bearer seu_token
```

---

# Rotas da API

## Auth

### Registrar usuário

```http
POST /auth/register
```

Body:

```json
{
  "name": "Rhyan",
  "email": "rhyan@email.com",
  "password": "123456"
}
```

---

### Login

```http
POST /auth/login
```

Body:

```json
{
  "email": "rhyan@email.com",
  "password": "123456"
}
```

---

### Usuário autenticado

```http
GET /auth/me
```

---

## Users

### Listar usuários

```http
GET /users
```

---

### Buscar usuário por ID

```http
GET /users/:id
```

---

### Criar usuário

```http
POST /users
```

---

### Atualizar usuário

```http
PUT /users/:id
```

---

### Deletar usuário (ADMIN)

```http
DELETE /users/:id
```

---

## Projects

### Criar projeto

```http
POST /projects
```

---

### Listar projetos

```http
GET /projects
```

---

### Buscar projeto por ID

```http
GET /projects/:id
```

---

### Atualizar projeto

```http
PUT /projects/:id
```

---

### Deletar projeto

```http
DELETE /projects/:id
```

---

## Tasks

### Criar tarefa

```http
POST /tasks
```

---

### Listar tarefas do projeto

```http
GET /tasks/project/:projectId
```

---

### Atualizar tarefa

```http
PUT /tasks/:id
```

---

### Deletar tarefa

```http
DELETE /tasks/:id
```

---

# Validação com Zod

A API utiliza **Zod** para validar dados de entrada.

Exemplos de validação:

- Email inválido
- Senha curta
- Nome com poucos caracteres

---

# Testes

Executar testes:

```bash
npm test
```

A aplicação utiliza:

- Vitest
- Supertest

---

# Autor

Projeto desenvolvido para o **Projeto Prático da C2**.

**Alunos:** Rhyan França, Samyla Silva Passos e Breno Porto

# Professor Instrutor
Prof. Otávio Lube
