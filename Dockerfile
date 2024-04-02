FROM --platform=linux/arm64 node:alpine

RUN apk add --no-cache yarn

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000