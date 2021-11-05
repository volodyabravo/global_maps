# Frontend
FROM node:16-alpine as frontend
WORKDIR /app



COPY ./printer/package.json ./package.json
RUN npm install

COPY ./printer/  .
RUN npm run build


from node:16-alpine

env PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"
env DOCKER="true"

WORKDIR /app

RUN set -x \
  && apk update \
  && apk upgrade \
  && apk add --no-cache dumb-init curl make gcc g++ python3 linux-headers binutils-gold gnupg libstdc++ nss chromium \
  && npm install puppeteer \
  # Do some cleanup
  && apk del --no-cache make gcc g++ python3 binutils-gold gnupg libstdc++ \
  && rm -rf /usr/include \
  && rm -rf /var/cache/apk/* /root/.node-gyp /usr/share/man /tmp/*

COPY --from=frontend /app/ .
# Change to non-root privilege
RUN chown node:node images/
USER node

CMD [ "node", "index.js" ]