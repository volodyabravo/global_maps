# Frontend
FROM node:16-alpine as frontend
WORKDIR /app

COPY ./printer/package.json ./package.json
RUN npm install

COPY ./printer/  .
RUN npm run build


from node:16-alpine
WORKDIR /app
COPY --from=frontend /app/ .

CMD [ "node", "index.js" ]