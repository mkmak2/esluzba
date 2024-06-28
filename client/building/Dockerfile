FROM node:20.11.0

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/


RUN npm install

COPY . .

RUN npm run build
