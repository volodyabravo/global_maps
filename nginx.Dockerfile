# Frontend
FROM node:16-alpine as frontend
WORKDIR /app

RUN npm install -g pnpm

COPY ./frontend/package.json ./package.json

COPY ./frontend/  .
RUN pnpm install
RUN pnpm run build

from nginxinc/nginx-unprivileged
WORKDIR /app
COPY --from=frontend /app/dist/ .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
