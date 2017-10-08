FROM alpine:3.6

ENV APP /app

RUN mkdir $APP
WORKDIR $APP

RUN apk add --update gcc build-base nodejs nodejs-npm python \
 && rm -rf /var/cache/apk/*

ADD ./package.json ./package.json
ADD ./package-lock.json ./package-lock.json
RUN npm install

ADD ./support/* ./
ADD ./src ./src
