FROM alpine:3.6

ENV APP /app

RUN mkdir $APP
WORKDIR $APP

RUN apk add --update gcc build-base nodejs \
 && rm -rf /var/cache/apk/*

ADD ./support/* ./
ADD ./src ./src
