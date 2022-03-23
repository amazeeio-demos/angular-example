FROM uselagoon/node-16-builder:latest as builder

WORKDIR /app
COPY . /app

## temp whilst on weak internet connection (npm ERR! code ERR_SOCKET_TIMEOUT)
RUN npm install -g npm && npm cache clean --force

RUN npm install
RUN npm run build --prod