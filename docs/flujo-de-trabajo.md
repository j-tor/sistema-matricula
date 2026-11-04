Para vincular automáticamente cada PR con su Issue, agrega estas instrucciones al documento:

### Cambios en la sección 1

Reemplaza el último párrafo por:

> Anota el **número del Issue** (por ejemplo `#123`). Ese número debe aparecer en el nombre de la branch, el título del Pull Request y su descripción.

---

### Cambios en la sección 3

Usa el número del Issue en la branch:

```bash
git checkout -b feature/123-descripcion-corta
```

Ejemplo para el Issue #10:

```bash
git checkout -b feature/10-preparar-repositorio
```

> El número del Issue permite identificar rápidamente a qué tarea pertenece la branch y el Pull Request.

---

### Reemplaza la sección 8 por esta

## 8. Crear el Pull Request

El Pull Request debe estar dirigido desde la branch del Issue hacia `develop`.

| Campo | Valor |
|---|---|
| **Base branch** | `develop` |
| **Compare branch** | La branch creada para el Issue |
| **Título** | Tipo de cambio + descripción + número del Issue |

Ejemplo:

```text
feat: preparar estructura inicial del repositorio (#10)
```

La descripción debe incluir una referencia al Issue:

```markdown
## Resumen

Breve descripción de los cambios realizados.

## ¿Cómo se probó?

- Pasos seguidos para validar el cambio.
- Tests ejecutados.

## Consideraciones

- Cambios en base de datos, variables de entorno o dependencias.

## Issue relacionado

Closes #10
```

Usa las palabras clave según el resultado deseado:

```text
Closes #10
```

Cierra automáticamente el Issue cuando el PR se integre.

```text
Fixes #10
```

También cierra automáticamente el Issue.

```text
Refs #10
```

Vincula el PR con el Issue, pero no lo cierra.

> Para tareas terminadas, usa `Closes #número`. Para trabajo parcial o en progreso, usa `Refs #número`.

---

### Agrega esta sección después de la sección 8

## 8.1 Verificar que el PR esté vinculado

Antes de solicitar la revisión, confirma que:

- La branch contiene el número del Issue.
- El título del PR contiene el número del Issue.
- La descripción incluye `Closes #número`, `Fixes #número` o `Refs #número`.
- La branch base sea `develop`.
- GitHub muestre el Issue relacionado en la página del Pull Request.

Ejemplo completo:

```text
Issue: #10 Preparar el repositorio de GitHub
Branch: feature/10-preparar-repositorio
PR: feat: preparar estructura inicial del repositorio (#10)
Descripción: Closes #10
```

---

### Actualiza las reglas de oro

```markdown
## Reglas de oro

1. **Sin Issue no hay branch.**
2. El número del Issue debe aparecer en la branch y en el Pull Request.
3. **Nunca** trabajar ni hacer commits directamente en `develop` o `main`.
4. Una branch = un Issue.
5. Cada PR debe incluir `Closes #número`, `Fixes #número` o `Refs #número`.
6. Todo cambio entra a `develop` mediante un Pull Request revisado.
7. Borrar la branch después del merge.
```

Para tu caso concreto:

```text
Branch: feature/10-preparar-repositorio
PR: feat: initialize project structure with frontend, backend, and docker (#10)
Descripción: Closes #10
```