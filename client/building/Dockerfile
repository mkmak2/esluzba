FROM node:20.11.0

ARG API_KEY=http://localhost:5000
ENV REACT_APP_API_KEY ${API_KEY}

# ARG TOKEN

# RUN apt-get update
# RUN apt-get upgrade -y
# RUN apt-get install -y git

# RUN git clone https://$TOKEN:x-oauth-basic@github.com/mkmak2/esluzba.git
WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

COPY . .

RUN npm install
RUN npm run build

CMD [ "ls", "build" ]
