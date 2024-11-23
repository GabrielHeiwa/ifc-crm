# Etapa 1: Build da aplicação
FROM node:20.18.0 AS build

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos necessários para instalar as dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:stable-alpine

# Copiar os arquivos estáticos da etapa de build para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar um arquivo de configuração personalizado para o Nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta padrão do Nginx
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
