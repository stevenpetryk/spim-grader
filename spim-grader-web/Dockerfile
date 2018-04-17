FROM nginx

RUN apt-get update \
 && apt-get install -y curl gnupg dirmngr apt-transport-https

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
 && apt-get install -y nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
 && apt-get update && apt-get install -y yarn

ENV NODE_ENV production
ENV SOCKET_URL ${SOCKET_URL}
ENV VIRTUAL_HOST ${VIRTUAL_HOST}

WORKDIR /app

ADD yarn.lock .
ADD package.json .
RUN yarn install

ADD . .
RUN yarn dist

EXPOSE 8000
ENV PORT 8000

ADD nginx.conf /etc/nginx/conf.d/default.conf
