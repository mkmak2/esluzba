FROM node:20.11.0

WORKDIR /server

COPY . .

RUN npm install

CMD ["npx", "ts-node", "index.ts"]