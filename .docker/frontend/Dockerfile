FROM node:22


WORKDIR /app
COPY chat-frontend/package*.json ./
RUN npm install
COPY chat-frontend/ ./
RUN npm run build


EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]





