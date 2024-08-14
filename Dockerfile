FROM node:22-alpine3.20

WORKDIR /src/app

RUN npm install -g npm@latest && npm install create-next-app



