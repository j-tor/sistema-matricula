# Componentes del sistema de matrícula

Este documento especifica únicamente los componentes reutilizables de la interfaz.

## 1. Identidad institucional

### Logo

- Versión normal a color.
- Versión grande para espacios destacados.
- Versión monocromática para documentos impresos.
- Colores principales:
  - Azul oscuro: `#0D4F8B`
  - Amarillo dorado: `#F5B400`

## 2. Botones

Todos los botones tienen esquinas redondeadas de `8 px`, texto semibold y una altura mínima de `40 px`.

### Botón primario

- Fondo azul `#1677C8`.
- Texto blanco.
- Se utiliza para la acción principal.
- Variantes de estado:
  - Normal.
  - Al pasar el cursor.
  - Deshabilitado.

### Botón secundario

- Fondo blanco.
- Borde y texto azul `#1677C8`.
- Se utiliza para acciones alternativas o para cancelar.

### Botón de peligro

- Fondo rojo `#D64545`.
- Texto blanco.
- Se utiliza para eliminar, anular o retirar registros.

### Botón de texto

- Sin fondo ni borde.
- Texto azul.
- Se utiliza para acciones de menor jerarquía.

### Botón con icono

- Puede combinar cualquiera de las variantes anteriores con un icono.
- El icono aparece antes del texto.

## 3. Campos de formulario

### Campo de texto

- Etiqueta siempre visible.
- Altura de `42 px`.
- Borde gris `#D9DEE5`.
- Esquinas redondeadas de `8 px`.
- Texto de ejemplo opcional.
- Indicador de campo obligatorio mediante asterisco rojo.
- Estados:
  - Normal.
  - En foco.
  - Solo lectura.
  - Deshabilitado.

### Campo de contraseña

- Conserva la estructura del campo de texto.
- Oculta los caracteres ingresados.

### Campo numérico

- Se utiliza para valores como edad o cantidades.
- Puede configurarse como solo lectura.

### Campo de fecha

- Formato visible: `dd/mm/aaaa`.
- Permite abrir el selector de fecha del sistema.

### Selector desplegable

- Etiqueta siempre visible.
- Presenta una opción inicial “Seleccionar”.
- Utiliza la misma altura, bordes y estados de los campos de texto.

### Campo de solo lectura

- Fondo gris claro.
- Texto secundario.
- No permite modificar el valor.
- Puede mostrar una ayuda como “Se calcula automáticamente”.

### Texto de ayuda

- Aparece debajo del campo.
- Utiliza un tamaño menor y color secundario `#5F6B7A`.
- Sirve para explicar formatos o comportamientos.

## 4. Buscador

- Icono de lupa.
- Campo de búsqueda.
- Texto orientativo.
- Puede incluir un botón “Buscar”.
- Estados:
  - Normal.
  - En foco.
  - Sin resultados.
  - Con resultados.

Ejemplos de uso:

- Buscar por nombre.
- Buscar por número de identidad.
- Buscar por curso o sección.

## 5. Selector Sí/No

- Presenta dos opciones excluyentes:
  - Sí.
  - No.
- Utiliza controles de opción.
- Al seleccionar “Sí” puede mostrar un campo adicional “Especifique”.
- El campo adicional desaparece al seleccionar “No”.

## 6. Etiquetas de estado

Las etiquetas utilizan forma redondeada, texto semibold y un indicador circular.

### Vigente

- Texto verde.
- Fondo verde suave.
- Color principal: `#2E9E5B`.

### Retirada

- Texto amarillo oscuro.
- Fondo amarillo suave.
- Color principal: `#F5B400`.

### Anulada

- Texto rojo.
- Fondo rojo suave.
- Color principal: `#D64545`.

## 7. Tarjetas

### Tarjeta base

- Fondo blanco.
- Borde gris claro.
- Esquinas redondeadas de `8 px`.
- Sombra suave.
- Espaciado interno amplio.

### Tarjeta de indicador

Contiene:

- Icono.
- Nombre del indicador.
- Valor principal.
- Texto complementario.
- Variación o comparación opcional.

Variantes de color para el icono:

- Azul.
- Azul oscuro.
- Amarillo.
- Verde.

### Tarjeta de sección de formulario

Contiene:

- Número de sección opcional.
- Título.
- Descripción breve.
- Campos organizados en columnas.

## 8. Tablas

### Tabla base

- Encabezado azul claro.
- Texto del encabezado en azul oscuro.
- Filas blancas.
- Separadores grises.
- Resaltado suave al pasar el cursor.

### Contenido permitido

- Texto.
- Número correlativo.
- Etiqueta de estado.
- Etiqueta de curso o sección.
- Enlaces de acción.
- Botones de acción.

### Pie de tabla

- Fondo gris claro.
- Muestra totales o resúmenes.

### Estado de fila seleccionada

- Fondo azul muy claro.
- Mantiene la legibilidad del contenido.

## 9. Paginación

Incluye:

- Cantidad de registros mostrados.
- Botón “Anterior”.
- Números de página.
- Página actual resaltada en azul.
- Botón “Siguiente”.
- Estado deshabilitado para acciones no disponibles.

## 10. Filtros

Un grupo de filtros puede contener:

- Selectores desplegables.
- Campos de texto.
- Campo de fecha.
- Botón “Aplicar filtros”.

Los filtros deben:

- Mantener etiquetas visibles.
- Presentarse en una sola fila cuando exista espacio.
- Conservar la misma altura visual.

## 11. Ventana de confirmación

Contiene:

- Icono de advertencia.
- Pregunta de confirmación.
- Texto explicativo.
- Botón “Confirmar”.
- Botón “Cancelar”.

Ejemplo:

> ¿Desea retirar a este estudiante de 7mo-1?

Texto complementario:

> El estudiante dejará de aparecer en el listado, pero se conservará su expediente.

## 12. Mensajes emergentes

### Mensaje de éxito

- Indicador verde.
- Título:

  > Matrícula registrada correctamente.

- Puede incluir una descripción complementaria.
- Se cierra automáticamente o mediante un botón.

### Mensaje de error

- Indicador rojo.
- Título:

  > Ya existe una matrícula vigente para este estudiante en el año seleccionado.

- Puede incluir instrucciones para resolver el problema.

## 13. Avisos informativos

### Aviso de advertencia

- Fondo amarillo suave `#FFF4D1`.
- Indicador amarillo dorado.
- Título y descripción.

Ejemplo:

> Esta sección tiene estudiantes matriculados. No puede eliminarse definitivamente.

### Aviso informativo

- Fondo azul claro.
- Texto azul oscuro.
- Se utiliza para aclaraciones sobre formularios o procesos.

## 14. Navegación

### Elemento de menú

Contiene:

- Icono.
- Nombre de la opción.
- Indicador opcional.

Estados:

- Normal.
- Al pasar el cursor.
- Activo con fondo destacado y franja amarilla.

### Pestaña

- Texto e icono opcional.
- Estado activo mediante texto azul y borde inferior azul.
- Se utiliza para cambiar entre categorías relacionadas.

## 15. Datos de usuario

### Avatar

- Forma circular.
- Iniciales del usuario.
- Fondo de color suave.
- Texto en color institucional.

### Identificación del usuario

Contiene:

- Rol.
- Nombre completo.
- Avatar.

## 16. Elementos académicos

### Etiqueta de curso o sección

- Fondo azul claro.
- Texto azul oscuro.
- Esquinas redondeadas.

Ejemplos:

- `7mo-1`
- `8vo-2`
- `10mo-1`

### Resumen de sección

Contiene:

- Nombre de la sección.
- Cantidad de estudiantes.
- Texto descriptivo.

### Historial

- Orden cronológico.
- Indicadores conectados mediante una línea.
- Año.
- Curso y sección.
- Estado.
- Fecha o descripción complementaria.

## 17. Acciones de exportación

### Imprimir

- Botón secundario con icono de impresora.
- Texto: “Imprimir listado”.

### Exportar a Excel

- Botón secundario con icono de descarga.
- Texto: “Exportar a Excel”.

### Descargar PDF

- Botón primario con icono de descarga.
- Texto: “Descargar PDF”.

## 18. Barra fija de acciones

- Permanece visible en la parte inferior.
- Fondo blanco.
- Borde superior y sombra suave.
- Muestra una recomendación o estado.
- Contiene:
  - Una acción secundaria.
  - Una única acción primaria.

## 19. Iconos

Los iconos utilizan:

- Trazos simples.
- Esquinas redondeadas.
- Grosor visual consistente.
- Tamaños entre `16 px` y `24 px`.
- Color heredado del componente.

Iconos requeridos:

- Inicio.
- Nuevo registro.
- Buscar.
- Cursos.
- Reportes.
- Cerrar sesión.
- Usuario.
- Calendario.
- Editar.
- Ver.
- Imprimir.
- Descargar.
- Agregar.
- Documento.
- Personas.
