# Chat App - Despliegue Local

Este proyecto consta de dos partes:

- **Backend:** [NestJS](https://nestjs.com/) (carpeta `chat-backend`)
- **Frontend:** [React](https://react.dev/) (carpeta `chat-frontend`)

## Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 20 o superior recomendada)
- [npm](https://www.npmjs.com/) (viene con Node.js)

Puedes verificarlo con:

## bash

- node -v
- npm -v
  
## correrlo usando docker (Verificar que los puerto no esten en uso, usar el comando dependiendo de la version docker)
- docker-compose up -d (Version antigua)
- docker compose up -d (Version reciente)

## correrlo en localhost (Backend)

- cd chat-backend
- npm install

## Ejecutar en modo desarrollo:

- npm run start:dev

## El backend quedará disponible en:

- http://localhost:3000

## correrlo en localhost (Frontend)

- cd chat-frontend
- npm install

## Ejecutar en modo desarrollo:

- npm run dev

## El backend quedará disponible en:

- http://localhost:5173
