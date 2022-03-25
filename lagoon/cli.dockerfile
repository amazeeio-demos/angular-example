FROM amazeeio/php:8.0-cli as phpcli

RUN apk del nodejs-current 
RUN apk add --no-cache nodejs=~16

WORKDIR /app
COPY . /app

## temp whilst on weak internet connection (npm ERR! code ERR_SOCKET_TIMEOUT)
RUN npm install -g npm && npm cache clean --force

RUN npm install -g @angular/cli

RUN npm install
RUN npm run build --prod

CMD ["/bin/docker-sleep"]
