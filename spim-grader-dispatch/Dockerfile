FROM alpine:3.6

RUN apk add --update docker nodejs nodejs-npm \
 && rm -rf /var/cache/apk/*

ADD ./package.json ./package.json
ADD ./package-lock.json ./package-lock.json
RUN npm install

ADD ./src ./src

CMD ["npm", "start"]
