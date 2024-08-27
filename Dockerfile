# Use uma imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instala o Angular CLI globalmente
RUN npm install -g @angular/cli@17

# Exponha a porta padrão usada pelo Angular (4200)
EXPOSE 4200

# Comando padrão para inicializar o contêiner
CMD ["bash"]
