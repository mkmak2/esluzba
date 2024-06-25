FROM node:20.11.0

WORKDIR /server

COPY . .

RUN npm install
RUN npm install -g dotenv-cli
RUN npx prisma generate
RUN npx prisma db push

CMD ["npx", "ts-node", "index.ts"]