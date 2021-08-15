FROM node:14-slim as builder

WORKDIR /usr/src/app

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn build

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:14-slim

WORKDIR /app

COPY --from=builder /usr/src/app  .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "yarn", "start" ]
