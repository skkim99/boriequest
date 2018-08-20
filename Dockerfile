FROM node:8

ENV NODE_ENV production

RUN mkdir /app
WORKDIR /app
COPY package-lock.json /app
COPY package.json /app

RUN npm install
RUN apt-get update && apt-get install -y \
  gnu-smalltalk \
  guile-2.0 \
  ghc \
  gprolog

COPY . /app
RUN npm run build

EXPOSE 4000

CMD ["node", "./backend"]