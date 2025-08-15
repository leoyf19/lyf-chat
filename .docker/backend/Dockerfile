FROM node:22


WORKDIR /app


# Copiamos package.json primero para aprovechar caché
COPY chat-backend/package*.json ./


# Instalamos todas las dependencias (incluyendo dev) para poder compilar
RUN npm install


# Copiamos el resto del código
COPY chat-backend/ ./


# Compilamos
RUN npm run build


# Eliminamos devDependencies para dejar imagen más ligera
RUN npm prune --production


EXPOSE 3000
CMD ["node", "dist/main"]





