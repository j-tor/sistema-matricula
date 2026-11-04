#  Sistema de Matrícula

Sistema web integral para la gestión y control de matrículas académicas.

Este repositorio está estructurado como un **monorepo** gestionado con `pnpm workspaces`, integrando backend, frontend y base de datos contenerizada.

---

##  Tecnologías

- **Frontend:** React 18, Vite 6, Material UI (MUI v9), React Router DOM, Axios
- **Backend:** Node.js, Express 4, Sequelize ORM
- **Base de Datos:** PostgreSQL 16 (orquestada mediante Docker Compose)
- **Gestor de Paquetes:** `pnpm` (modo workspaces)

---

##  Requisitos previos

Asegúrate de contar con lo siguiente instalado en tu entorno local:

- **[Node.js](https://nodejs.org/)** (v20 o superior recomendada)
- **[pnpm](https://pnpm.io/)** (v9 o superior)
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (activo para la base de datos)

---

##  Guía de inicio rápido

### 1. Clonar el repositorio y ubicarse en la raíz

```bash
git clone <URL_DEL_REPOSITORIO>
cd sistema-matricula
```

### 2. Instalar las dependencias de todo el monorepo

```bash
pnpm install
```

### 3. Configurar las variables de entorno

Copia las plantillas `.env.example` en sus respectivos proyectos:

**En Linux / macOS / Git Bash:**
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**En Windows (PowerShell):**
```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

*(Los valores por defecto ya están configurados para el entorno local).*

### 4. Iniciar la base de datos con Docker

Inicia el contenedor de PostgreSQL en segundo plano:

```bash
docker compose up -d
```

Para verificar que el contenedor esté corriendo:

```bash
docker compose ps
```

### 5. Iniciar la aplicación en modo desarrollo

Puedes ejecutar ambos servicios (backend y frontend) de forma simultánea con un solo comando:

```bash
pnpm dev
```

---

##  URLs y Puertos de Desarrollo

| Servicio | URL / Host | Descripción |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:5174](http://localhost:5174) | SPA React con Material UI |
| **Backend API** | [http://localhost:3005](http://localhost:3005) | Servidor API REST Express |
| **Health Check** | [http://localhost:3005/health](http://localhost:3005/health) | Estado del servidor y conexión a BD |
| **PostgreSQL** | `localhost:5434` | Base de datos (`sistema_matricula`) |

>  **Nota sobre el proxy:** En desarrollo, el frontend incluye un proxy en Vite que redirige automáticamente cualquier petición `/api` o `/health` hacia el puerto `3005` del backend.

---

##  Comandos disponibles

Desde la raíz del proyecto:

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Inicia backend y frontend en paralelo con recarga en caliente |
| `pnpm dev:backend` | Inicia únicamente el servidor backend (`nodemon`) |
| `pnpm dev:frontend` | Inicia únicamente el servidor de desarrollo de Vite |
| `pnpm build` | Genera el build de producción del frontend (`frontend/dist/`) |
| `pnpm lint` | Ejecuta el linter en todos los paquetes del workspace |
| `docker compose up -d` | Levanta el contenedor de PostgreSQL |
| `docker compose down` | Detiene el contenedor de base de datos |
| `docker compose down -v` | Detiene el contenedor y elimina el volumen de datos |

---

##  Flujo de trabajo y contribución

Para mantener el orden del repositorio, consulta las reglas del equipo en:
👉 [Guía de Flujo de Trabajo (Issues, Branches y Pull Requests)](./flujo-de-trabajo.md)

Sistema web integral para la gestión y control de matrículas académicas.

Este repositorio está estructurado como un **monorepo** gestionado con `pnpm workspaces`, integrando backend, frontend y base de datos contenerizada.

---

## 🛠️ Tecnologías

- **Frontend:** React 18, Vite 6, Material UI (MUI v9), React Router DOM, Axios
- **Backend:** Node.js, Express 4, Sequelize ORM
- **Base de Datos:** PostgreSQL 16 (orquestada mediante Docker Compose)
- **Gestor de Paquetes:** `pnpm` (modo workspaces)

---

## 📋 Requisitos previos

Asegúrate de contar con lo siguiente instalado en tu entorno local:

- **[Node.js](https://nodejs.org/)** (v20 o superior recomendada)
- **[pnpm](https://pnpm.io/)** (v9 o superior)
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (activo para la base de datos)

---

## 🚀 Guía de inicio rápido

### 1. Clonar el repositorio y ubicarse en la raíz

```bash
git clone <URL_DEL_REPOSITORIO>
cd sistema-matricula
```

### 2. Instalar las dependencias de todo el monorepo

```bash
pnpm install
```

### 3. Configurar las variables de entorno

Copia las plantillas `.env.example` en sus respectivos proyectos:

**En Linux / macOS / Git Bash:**
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**En Windows (PowerShell):**
```powershell
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

*(Los valores por defecto ya están configurados para el entorno local).*

### 4. Iniciar la base de datos con Docker

Inicia el contenedor de PostgreSQL en segundo plano:

```bash
docker compose up -d
```

Para verificar que el contenedor esté corriendo:

```bash
docker compose ps
```

### 5. Iniciar la aplicación en modo desarrollo

Puedes ejecutar ambos servicios (backend y frontend) de forma simultánea con un solo comando:

```bash
pnpm dev
```

---

## 🌐 URLs y Puertos de Desarrollo

| Servicio | URL / Host | Descripción |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:5174](http://localhost:5174) | SPA React con Material UI |
| **Backend API** | [http://localhost:3005](http://localhost:3005) | Servidor API REST Express |
| **Health Check** | [http://localhost:3005/health](http://localhost:3005/health) | Estado del servidor y conexión a BD |
| **PostgreSQL** | `localhost:5434` | Base de datos (`sistema_matricula`) |

> 💡 **Nota sobre el proxy:** En desarrollo, el frontend incluye un proxy en Vite que redirige automáticamente cualquier petición `/api` o `/health` hacia el puerto `3005` del backend.

---

## 📜 Comandos disponibles

Desde la raíz del proyecto:

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Inicia backend y frontend en paralelo con recarga en caliente |
| `pnpm dev:backend` | Inicia únicamente el servidor backend (`nodemon`) |
| `pnpm dev:frontend` | Inicia únicamente el servidor de desarrollo de Vite |
| `pnpm build` | Genera el build de producción del frontend (`frontend/dist/`) |
| `pnpm lint` | Ejecuta el linter en todos los paquetes del workspace |
| `docker compose up -d` | Levanta el contenedor de PostgreSQL |
| `docker compose down` | Detiene el contenedor de base de datos |
| `docker compose down -v` | Detiene el contenedor y elimina el volumen de datos |

---

## 🤝 Flujo de trabajo y contribución

Para mantener el orden del repositorio, consulta las reglas del equipo en:
👉 [Guía de Flujo de Trabajo (Issues, Branches y Pull Requests)](./flujo-de-trabajo.md)
