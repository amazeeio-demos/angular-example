ARG CLI_IMAGE
FROM ${CLI_IMAGE} as cli

FROM uselagoon/node-16

COPY --from=cli /app /app

RUN npm install -g @angular/cli

EXPOSE 3000
# CMD ["ng","serve","--port","3000","--host","0.0.0.0","--disable-host-check"]
CMD ["ng","build","--watch"]
