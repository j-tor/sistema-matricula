# Etapa 1: compilar el frontend con Vite
FROM node:22-alpine AS build

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY frontend/package.json frontend/
RUN pnpm install --frozen-lockfile --filter frontend...

COPY frontend frontend
RUN pnpm --filter frontend build

# Etapa 2: servir los archivos estáticos con nginx
FROM nginx:1.27-alpine
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
