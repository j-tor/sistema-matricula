# Imagen del backend NestJS + Prisma
FROM node:22-alpine

# openssl es requerido por el motor de Prisma en Alpine
RUN apk add --no-cache openssl \
  && corepack enable \
  && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# 1. Instalar dependencias (capa cacheable mientras no cambie el lockfile)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY backend/package.json backend/
COPY backend/prisma backend/prisma
RUN pnpm install --frozen-lockfile --filter backend...

# 2. Compilar el código
COPY backend backend
RUN pnpm --filter backend build

WORKDIR /app/backend
EXPOSE 3005

# Aplica las migraciones pendientes y arranca la API
CMD ["sh", "-c", "pnpm db:migrate && node dist/main.js"]
