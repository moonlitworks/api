FROM node:alpine AS build
WORKDIR /app
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install
COPY ./src ./src
COPY ./public ./public
RUN yarn build

FROM nginx:alpine
WORKDIR /app
RUN apk --no-cache add nodejs npm yarn
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/lib ./lib
COPY --from=build /app/public ./public
EXPOSE 80
ENTRYPOINT [ "node", "." ]
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "curl", "http://localhost/health" ]