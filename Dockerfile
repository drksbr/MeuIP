# Usa a imagem oficial do Node.js LTS
FROM node:16

# Define o diretório de trabalho
WORKDIR /app

# Copia o package.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código da aplicação
COPY . .

# Exponha a porta
EXPOSE 3000

# Inicia a aplicação
CMD ["npm", "start"]
