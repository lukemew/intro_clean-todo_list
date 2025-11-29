# 📝 API de Lista de Tarefas (To-Do List)

API RESTful desenvolvida em **Node.js** com **TypeScript**, focada na aplicação dos princípios de **Clean Architecture**, **DDD (Domain-Driven Design)** e **SOLID**.

O projeto fornece um sistema completo para gerenciamento de tarefas (CRUD), utilizando **PostgreSQL** como banco de dados e **Fastify** como framework web.

## 🚀 Tecnologias Utilizadas

- **Linguagem:** TypeScript / Node.js (v22+)
- **Framework:** Fastify
- **Banco de Dados:** PostgreSQL (via Docker)
- **ORM:** TypeORM
- **Validação:** Zod
- **Testes:** Vitest
- **Arquitetura:** Clean Architecture (Camadas de Domínio, Aplicação e Infraestrutura)

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (Recomendado v20 ou superior)
- [Docker](https://www.docker.com/) & Docker Compose

## 🛠️ Como Rodar o Projeto

Siga os passos abaixo para configurar e executar a aplicação:

### 1. Clone o repositório e instale as dependências

npm install
### 2. Configure as Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto (baseado no .env.example se houver) com o seguinte conteúdo:

Snippet de código

# Server
PORT=3333
NODE_ENV=dev

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=docker
DB_NAME=todo_list_db
### 3. Suba o Banco de Dados
Utilize o Docker Compose para iniciar o container do PostgreSQL:


docker compose up -d
### 4. Execute as Migrations
Crie as tabelas no banco de dados:


npm run migration:run
### 5. Inicie o Servidor

npm run dev
O servidor estará rodando em: http://localhost:3333

## Desenvolvido como parte da avaliação final de TypeScript/Node.js.
