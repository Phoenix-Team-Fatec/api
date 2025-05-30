# Backend - Submódulo

Este projeto é o backend de um sistema desenvolvido com **TypeScript**, utilizando **PostgreSQL** como banco de dados e **Firebase** para autenticação e armazenamento de dados.

## Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Express.js** como framework backend
- **PostgreSQL** como banco de dados relacional
- **TypeORM** como ORM
- **Firebase** para autenticação e armazenamento

## Configuração do Ambiente

Antes de iniciar o projeto, crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente com os valores apropriados:

```ini
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id

DB_HOST=your_host
DB_PORT=your_port
DB_USER=your_user
DB_PASSWD=your_passwd
DB_NAME=your_dbName
```

## Instalação

Para rodar o backend, siga os seguintes passos:

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-repositorio.git
   ```

2. Entre no diretório do backend:
   ```bash
   cd backend
   ```

3. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

4. Execute as migrations do banco de dados:
   ```bash
   npm run migration:run
   # ou
   yarn migration:run
   ```

## Executando o Servidor

Para iniciar o servidor de desenvolvimento, utilize:

```bash
npm run dev
# ou
yarn dev
```

O backend estará rodando em `http://localhost:3000` por padrão.

## Estrutura do Projeto

```
/backend
│── src/
│   ├── controllers/  # Lógica dos endpoints
│   ├── entities/     # Definição das entidades do banco
│   ├── middlewares/  # Middlewares de autenticação e validação
│   ├── services/     # Lógica de negócios
│   ├── routes/       # Definição das rotas
│   ├── config/       # Configuração do banco de dados e Firebase
│   ├── index.ts      # Arquivo principal da aplicação
│── .env.example      # Exemplo de variáveis de ambiente
│── package.json      # Dependências e scripts do projeto
```



## Deploy

Para deploy em produção, recomenda-se utilizar plataformas como **Vercel**, **Railway** ou **Render**. Certifique-se de definir corretamente as variáveis de ambiente no servidor de produção.

## Contribuição

Caso queira contribuir com o projeto, siga os seguintes passos:

1. Fork o repositório
2. Crie uma nova branch: `git checkout -b minha-feature`
3. Faça suas alterações e commit: `git commit -m "Adicionei uma nova feature"`
4. Envie suas alterações: `git push origin minha-feature`
5. Abra um Pull Request

---
## MODELO DO BANCO DE DADOS
![lumen_Physical_Export-2025-05-30_08-24 (1)](https://github.com/user-attachments/assets/586bccdb-12d2-4815-b74d-54a3b524b597)


![lumen-2025-05-30_09-52](https://github.com/user-attachments/assets/fd2053c8-2171-4e43-b669-5f9d6cda03de)


