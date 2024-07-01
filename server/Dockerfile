FROM node:20.11.0

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /server

ARG PORT=5000
ENV PORT $PORT


ARG DB_URL=postgresql://postgres:postgres@db:5432/postgres?schema=public
ENV DB_URL $DB_URL

COPY package.json /server/package.json
COPY package-lock.json /server/package-lock.json
RUN npm install

COPY . /server

CMD ["npx", "ts-node", "index.ts"]  