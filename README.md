# Sistema de Matrícula

Monorepo con pnpm workspaces: React 18, Vite 6 y Material UI en el frontend; NestJS 11, TypeScript y Prisma en el backend; PostgreSQL 16. Todo se puede levantar con Docker Compose.

## Inicio rápido con Docker (recomendado)

Solo necesitas Docker Desktop. Desde la raíz:

```powershell
docker compose up -d --build
```

Se levantan tres contenedores:

| Contenedor | Dirección | Descripción |
| --- | --- | --- |
| `sistema-matricula-frontend` | http://localhost:5174 | React compilado y servido por nginx; reenvía `/api` y `/health` al backend |
| `sistema-matricula-backend` | http://localhost:3005/api | NestJS; aplica las migraciones de Prisma al arrancar |
| `sistema-matricula-db` | localhost:5434 | PostgreSQL 16 con volumen persistente |

Comprueba la conexión a la base de datos en http://localhost:3005/health, que debe responder `{"status":"ok","db":"connected"}`.

Para cargar los datos iniciales, completa las variables `SEED_USER_*` en `backend/.env` y ejecuta `pnpm docker:seed`. El contenedor del backend lee `backend/.env` si existe, pero usa siempre la `DATABASE_URL` definida en `docker-compose.yml`.

Después de cambiar el código, vuelve a ejecutar `docker compose up -d --build`.

## Desarrollo local (sin contenedores para backend y frontend)

Instala Node.js 20 o superior, pnpm 9 o superior y Docker Desktop. Desde la raíz:

```powershell
pnpm install
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
docker compose up -d postgres
pnpm --filter backend db:migrate
pnpm dev
```

Copia las plantillas solamente en la primera configuración; conserva tus archivos `.env` existentes. Si los contenedores del backend y del frontend están corriendo, detenlos antes (`docker compose stop backend frontend`) para liberar los puertos 3005 y 5174.

Vite redirige `/api` y `/health` al backend. Las variables `PORT` y `FRONTEND_URL` configuran el puerto de la API y el origen permitido por CORS, y `DATABASE_URL` indica a Prisma cómo conectarse a PostgreSQL.

## Comandos

| Comando | Función |
| --- | --- |
| `pnpm dev` | Backend y frontend con recarga automática |
| `pnpm dev:backend` | NestJS en modo watch |
| `pnpm dev:frontend` | Vite en desarrollo |
| `pnpm build` | Compila backend y frontend en sus carpetas `dist` |
| `pnpm --filter backend start` | Ejecuta el backend compilado |
| `pnpm --filter backend typecheck` | Comprueba los tipos del backend |
| `pnpm test` | Compila y prueba las rutas HTTP del backend |
| `pnpm docker:up` | Construye y levanta todos los contenedores |
| `pnpm docker:down` | Detiene los contenedores (los datos se conservan en el volumen) |
| `pnpm docker:logs` | Muestra los logs del backend y el frontend |
| `pnpm docker:seed` | Carga los datos iniciales dentro del contenedor |
| `pnpm --filter backend db:migrate` | Aplica las migraciones pendientes |
| `pnpm --filter backend db:migrate:dev` | Crea una nueva migración a partir de `schema.prisma` |
| `pnpm --filter backend db:seed` | Carga los datos iniciales |
| `pnpm --filter backend db:studio` | Abre Prisma Studio para ver los datos |

Las pruebas HTTP simulan la conexión de base de datos. Para verificar la conexión real, inicia PostgreSQL y consulta `/health`.

## Backend NestJS

- `src/main.ts`: arranque, CORS y cierre de recursos.
- `src/app.module.ts`: módulo raíz.
- `src/app.controller.ts`: ruta `GET /api`.
- `src/database/`: `PrismaService` global, que se conecta al iniciar y cierra la conexión al detener la aplicación.
- `prisma/`: `schema.prisma`, migraciones y `seed.ts`.
- `src/health/`: ruta `GET /health`, responde 200 con BD conectada y 500 si falla.
- `test/`: pruebas HTTP.

Agrega las nuevas funciones como módulos NestJS con controladores y servicios. `DatabaseModule` es global: inyecta `PrismaService` en el constructor de cualquier servicio para consultar la base de datos (por ejemplo `this.prisma.curso.findMany()`). Los cambios de tablas se hacen en `schema.prisma` y se aplican con migraciones. Las rutas desconocidas usan la respuesta 404 estándar de NestJS.

## Regla: no se permiten años lectivos futuros

El sistema solo acepta el año actual o los anteriores. El año actual se calcula con la **fecha del servidor** en la zona horaria `America/Tegucigalpa` (variable `ZONA_HORARIA`); no hay ningún año escrito en el código. La regla se aplica en dos niveles, por lo que no se puede evitar modificando la página:

1. **Backend:** `src/modules/anios-lectivos/` valida el año antes de guardar y responde `400` con «No se permiten años lectivos futuros».
2. **Base de datos:** un trigger en `seccion` y `matricula` rechaza cualquier `INSERT` o `UPDATE` con un año futuro, aunque no pase por el backend. El filtro `AnioFuturoFilter` convierte ese rechazo en el mismo error `400`.

Para usar la regla en un nuevo endpoint:

```ts
// En un parámetro de ruta o consulta
@Get(':anio') listar(@Param('anio', AnioLectivoPipe) anio: number) { ... }

// Dentro de un servicio (inyectando AniosLectivosService)
this.aniosLectivos.validarAnio(dto.anio);
```

El frontend debe pedir el año actual a `GET /api/anios-lectivos/actual` en lugar de usar el reloj del navegador.

Referencia: [documentación de NestJS 11](https://docs.nestjs.com/v11/first-steps).

Consulta la [guía de flujo de trabajo](docs/flujo-de-trabajo.md).
