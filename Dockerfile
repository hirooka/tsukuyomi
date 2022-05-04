FROM node:16-slim as builder

# Required on Raspberry Pi (arm64) only
#RUN apt-get update && apt-get install -y python3 make g++

WORKDIR /usr/src/app

COPY . .
COPY .yarn ./.yarn
RUN yarn set version 3.2.0

# Required on Raspberry Pi (arm64) only
#RUN yarn add node-gyp

RUN yarn install
RUN yarn build
RUN rm -rf node_modules && \
  NODE_ENV=production yarn install

FROM node:16-slim

WORKDIR /app

COPY --from=builder /usr/src/app  .

ENV HOST 0.0.0.0
EXPOSE 3000

ENV HLS_SERVER_URI http://izanami:8080

CMD [ "yarn", "start" ]
