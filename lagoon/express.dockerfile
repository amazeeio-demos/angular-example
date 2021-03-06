ARG CLI_IMAGE
FROM ${CLI_IMAGE} as cli

FROM uselagoon/node-16

COPY --from=cli /app /app

RUN npm install -g @angular/cli

RUN fix-permissions /app/.angular
RUN fix-permissions /app/dist

EXPOSE 3000
CMD ["node","server.js"]
