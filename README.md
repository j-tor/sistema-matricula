# Sistema de Matrícula

Monorepo con pnpm workspaces: React 18, Vite 6 y Material UI en el frontend; NestJS 11, TypeScript y Sequelize en el backend; PostgreSQL 16 con Docker Compose.

## Requisitos e inicio

Instala Node.js 20 o superior, pnpm 9 o superior y Docker Desktop. Desde la raíz:

```powershell
pnpm install
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
docker compose up -d
pnpm dev
```

Copia las plantillas solamente en la primera configuración; conserva tus archivos `.env` existentes.

| Servicio | Dirección |
| --- | --- |
| Frontend | http://localhost:5174 |
| API | http://localhost:3005/api |
| Estado de servidor y conexión a BD | http://localhost:3005/health |
| PostgreSQL | localhost:5434 |

Vite redirige `/api` y `/health` al backend. Las variables `PORT` y `FRONTEND_URL` configuran el puerto de la API y el origen permitido por CORS.

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

Las pruebas HTTP simulan la conexión de base de datos. Para verificar la conexión real, inicia PostgreSQL y consulta `/health`.

## Backend NestJS

- `src/main.ts`: arranque, CORS y cierre de recursos.
- `src/app.module.ts`: módulo raíz.
- `src/app.controller.ts`: ruta `GET /api`.
- `src/database/`: servicio Sequelize inyectable, con cierre de conexiones al detener la aplicación.
- `src/health/`: ruta `GET /health`, responde 200 con BD conectada y 500 si falla.
- `test/`: pruebas HTTP.

Agrega las nuevas funciones como módulos NestJS con controladores y servicios. Importa `DatabaseModule` para inyectar `DatabaseService` y acceder a `sequelize`. El arranque no modifica tablas ni sincroniza esquemas automáticamente. Las rutas desconocidas usan la respuesta 404 estándar de NestJS.

Referencia: [documentación de NestJS 11](https://docs.nestjs.com/v11/first-steps).

Consulta la [guía de flujo de trabajo](docs/flujo-de-trabajo.md).
