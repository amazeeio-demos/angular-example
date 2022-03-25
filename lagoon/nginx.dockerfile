ARG CLI_IMAGE
FROM ${CLI_IMAGE} as cli

FROM uselagoon/nginx
COPY lagoon/nginx/static-files.conf /etc/nginx/conf.d/app.conf
RUN fix-permissions /etc/nginx/conf.d/app.conf

COPY --from=cli /app/dist/angular-example/ /app

EXPOSE 8080
