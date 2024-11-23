# Etapa 1: Build da aplicação
FROM node:20.18.0 AS build

ARG DATABASE_URL

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos necessários para instalar as dependências
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar todo o código da aplicação
COPY . .

# Compilar a aplicação NestJS
RUN npm run build

# Etapa 2: Ambiente de Produção
FROM node:20.18.0

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos compilados da etapa de build
COPY --from=build /app/prisma ./dist
COPY --from=build /app/dist ./dist

# Copiar os arquivos necessários para rodar o aplicativo
COPY package.json package-lock.json ./

# Copiar o esquema Prisma e migrações
COPY prisma ./prisma

# Instalar apenas dependências de produção
RUN npm install --omit=dev

# Expor a porta do aplicativo (caso seja a 3000)
EXPOSE 3000

# Comando padrão para iniciar o aplicativo
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]

