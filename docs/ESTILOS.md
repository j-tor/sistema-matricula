# Guía de estilos del sistema de matrícula

Este documento define los estilos visuales del Sistema de Matrícula Estudiantil del Centro de Educación Media Gubernamental Técnico “Dr. Jorge Fidel Durón”.

Su propósito es mantener una apariencia institucional, clara y consistente en todos los elementos de la interfaz.

---

## 1. Principios visuales

La interfaz debe transmitir:

- Confianza institucional.
- Orden administrativo.
- Claridad en formularios y tablas.
- Facilidad de uso para personal no técnico.
- Buena legibilidad durante jornadas prolongadas.
- Consistencia entre todos los elementos.
- Reducción de errores mediante estados visuales claros.

El diseño debe utilizar:

- Mucho espacio en blanco.
- Jerarquías visuales fáciles de reconocer.
- Colores institucionales aplicados con moderación.
- Textos cómodos de leer.
- Bordes y sombras suaves.
- Controles grandes y fáciles de seleccionar.

No se deben utilizar:

- Colores neón.
- Degradados excesivos.
- Sombras fuertes.
- Bordes demasiado oscuros.
- Textos menores de `14 px` para información importante.
- Animaciones decorativas que distraigan.
- Fondos con patrones o texturas.

---

## 2. Identidad institucional

La identidad visual se inspira en el logotipo del centro educativo:

- Engranaje amarillo dorado.
- Anillo azul.
- Símbolo educativo central.

El azul representa:

- Confianza.
- Educación.
- Orden.
- Institucionalidad.

El amarillo dorado representa:

- Formación técnica.
- Energía.
- Progreso.
- Elementos que requieren atención.

### Uso general de la identidad

- El azul oscuro se utiliza en áreas institucionales y de navegación.
- El azul primario se utiliza en acciones principales y enlaces.
- El amarillo dorado se utiliza como acento.
- El amarillo no debe sustituir al azul como color de acción principal.
- El logotipo debe mantener suficiente espacio libre a su alrededor.

---

## 3. Paleta de colores

### 3.1 Azul primario

**Valor:** `#1677C8`

Se utiliza en:

- Botones principales.
- Enlaces.
- Campos activos.
- Iconos de acción.
- Indicadores seleccionados.
- Elementos interactivos.
- Paginación activa.

El texto colocado sobre este color debe ser blanco.

```css
--color-azul-primario: #1677C8;
```

### 3.2 Azul oscuro

**Valor:** `#0D4F8B`

Se utiliza en:

- Encabezados principales.
- Títulos.
- Fondos institucionales.
- Navegación principal.
- Elementos de identidad.
- Bloques destacados.

El texto colocado sobre este color debe ser blanco o azul muy claro.

```css
--color-azul-oscuro: #0D4F8B;
```

### 3.3 Azul claro

**Valor recomendado:** `#EAF4FC`

Se utiliza en:

- Fondos de información.
- Encabezados de tabla.
- Iconos con fondo.
- Etiquetas académicas.
- Filas seleccionadas.
- Estados activos suaves.

```css
--color-azul-claro: #EAF4FC;
```

### 3.4 Amarillo dorado

**Valor:** `#F5B400`

Se utiliza en:

- Acentos institucionales.
- Franja de navegación activa.
- Indicadores de advertencia.
- Detalles del logotipo.
- Resaltados pequeños.

No debe utilizarse como fondo para párrafos largos.

```css
--color-amarillo-dorado: #F5B400;
```

### 3.5 Amarillo suave

**Valor:** `#FFF4D1`

Se utiliza en:

- Fondos de advertencia.
- Avisos informativos importantes.
- Estados pendientes o retirados.
- Indicadores que necesitan atención.

```css
--color-amarillo-suave: #FFF4D1;
```

### 3.6 Verde de éxito

**Valor:** `#2E9E5B`

Se utiliza en:

- Confirmaciones exitosas.
- Estados vigentes.
- Indicadores positivos.
- Iconos de operación completada.

```css
--color-exito: #2E9E5B;
```

### 3.7 Rojo de error

**Valor:** `#D64545`

Se utiliza en:

- Mensajes de error.
- Campos inválidos.
- Acciones peligrosas.
- Estados anulados.
- Indicadores de eliminación.

El rojo debe reservarse para errores o acciones que puedan tener consecuencias importantes.

```css
--color-error: #D64545;
```

### 3.8 Texto principal

**Valor:** `#1A1A1A`

Se utiliza en:

- Textos generales.
- Valores de campos.
- Contenido de tablas.
- Información principal.

```css
--color-texto: #1A1A1A;
```

### 3.9 Texto secundario

**Valor:** `#5F6B7A`

Se utiliza en:

- Descripciones.
- Textos de ayuda.
- Información complementaria.
- Etiquetas de menor jerarquía.
- Fechas y metadatos.

```css
--color-texto-secundario: #5F6B7A;
```

### 3.10 Bordes

**Valor:** `#D9DEE5`

Se utiliza en:

- Campos de formulario.
- Tarjetas.
- Tablas.
- Separadores.
- Controles secundarios.

```css
--color-borde: #D9DEE5;
```

### 3.11 Fondo general

**Valor:** `#F5F7FA`

Se utiliza como fondo principal de la aplicación.

Su función es separar visualmente las tarjetas blancas y reducir el cansancio visual.

```css
--color-fondo: #F5F7FA;
```

### 3.12 Fondo de tarjetas

**Valor:** `#FFFFFF`

Se utiliza en:

- Formularios.
- Tablas.
- Tarjetas informativas.
- Ventanas de confirmación.
- Contenedores de contenido.

```css
--color-superficie: #FFFFFF;
```

---

## 4. Combinaciones permitidas

### Azul primario sobre blanco

- Fondo: `#FFFFFF`
- Texto o icono: `#1677C8`
- Uso: enlaces y acciones secundarias.

### Blanco sobre azul primario

- Fondo: `#1677C8`
- Texto: `#FFFFFF`
- Uso: acciones principales.

### Blanco sobre azul oscuro

- Fondo: `#0D4F8B`
- Texto: `#FFFFFF`
- Uso: áreas institucionales.

### Azul oscuro sobre azul claro

- Fondo: `#EAF4FC`
- Texto: `#0D4F8B`
- Uso: encabezados de tabla, etiquetas y avisos.

### Texto oscuro sobre amarillo suave

- Fondo: `#FFF4D1`
- Texto recomendado: `#6C5516`
- Uso: advertencias.

### Verde sobre verde suave

- Fondo recomendado: `#E8F6EE`
- Texto: `#247B49`
- Uso: estados correctos o vigentes.

### Rojo sobre rojo suave

- Fondo recomendado: `#FDECEC`
- Texto: `#B73333`
- Uso: errores y estados anulados.

---

## 5. Tipografía

### Familia tipográfica principal

Se debe utilizar **Inter**.

Alternativa permitida:

- Poppins.

Familias de respaldo:

```css
font-family: Inter, Poppins, Arial, sans-serif;
```

### Razones para utilizar Inter

- Es fácil de leer en computadora.
- Tiene números claros.
- Funciona bien en tablas.
- Mantiene buena legibilidad en tamaños pequeños.
- Incluye suficientes pesos tipográficos.

### Pesos permitidos

- Regular: `400`.
- Medium: `500`.
- Semibold: `600`.
- Bold: `700`.

No se recomienda utilizar pesos inferiores a `400`.

---

## 6. Escala tipográfica

### Título principal

- Tamaño: `28–32 px`.
- Altura de línea: `36–40 px`.
- Peso: `700`.
- Color: azul oscuro.
- Espaciado entre letras: `-0.02em`.

```css
font-size: 32px;
line-height: 40px;
font-weight: 700;
color: #0D4F8B;
```

### Título de módulo

- Tamaño: `22–26 px`.
- Altura de línea: `30–34 px`.
- Peso: `700`.
- Color: azul oscuro.

### Título de sección

- Tamaño: `17–20 px`.
- Altura de línea: `24–28 px`.
- Peso: `600` o `700`.
- Color: azul oscuro.

### Título de tarjeta

- Tamaño: `15–17 px`.
- Altura de línea: `22–24 px`.
- Peso: `600`.
- Color: azul oscuro.

### Texto base

- Tamaño mínimo: `14 px`.
- Tamaño recomendado: `15 px`.
- Altura de línea: `22–24 px`.
- Peso: `400`.
- Color: texto principal.

### Etiquetas de formulario

- Tamaño: `14 px`.
- Altura de línea: `20 px`.
- Peso: `600`.
- Color: texto principal.

### Texto de campos

- Tamaño: `14–15 px`.
- Altura de línea: `20 px`.
- Peso: `400`.
- Color: texto principal.

### Texto secundario

- Tamaño: `13–14 px`.
- Altura de línea: `19–21 px`.
- Peso: `400`.
- Color: texto secundario.

### Texto de ayuda

- Tamaño mínimo: `12 px`.
- Tamaño recomendado: `13 px`.
- Altura de línea: `18 px`.
- Color: texto secundario.

### Texto de botones

- Tamaño: `14 px`.
- Peso: `600`.
- Altura de línea: `20 px`.

### Texto de tablas

- Encabezado: `13–14 px`, peso `600`.
- Contenido: `14 px`, peso `400`.
- Valores principales: `14 px`, peso `600`.

### Valores numéricos destacados

- Tamaño: `26–32 px`.
- Peso: `700`.
- Color: azul oscuro.

---

## 7. Jerarquía de contenido

Cada bloque debe seguir este orden visual:

1. Título.
2. Descripción breve.
3. Contenido principal.
4. Información complementaria.
5. Acciones.

Reglas:

- Un título debe ser visualmente más fuerte que su descripción.
- Las acciones principales deben tener más contraste que las secundarias.
- La información complementaria debe utilizar texto secundario.
- No se debe utilizar color azul en todos los textos.
- Los párrafos extensos deben tener una altura de línea cómoda.

---

## 8. Espaciado

Se utiliza una escala basada principalmente en múltiplos de `4 px`.

### Escala recomendada

| Nombre | Valor | Uso |
|---|---:|---|
| Muy pequeño | `4 px` | Separación entre icono y detalle |
| Pequeño | `8 px` | Elementos relacionados |
| Medio pequeño | `12 px` | Contenido interno compacto |
| Medio | `16 px` | Separación habitual |
| Medio amplio | `20 px` | Grupos de contenido |
| Amplio | `24 px` | Interior de tarjetas |
| Muy amplio | `32 px` | Separación entre secciones |
| Sección | `40 px` | Bloques principales |
| Gran sección | `48–64 px` | Áreas independientes |

### Espaciado interno

- Botones: `12–18 px` horizontal.
- Campos: `12 px` horizontal.
- Tarjetas pequeñas: `16–20 px`.
- Tarjetas normales: `20–24 px`.
- Tarjetas destacadas: `24–32 px`.
- Ventanas de confirmación: `28–32 px`.

### Espaciado entre campos

- Separación horizontal: `16–20 px`.
- Separación vertical: `16–20 px`.
- Separación entre etiqueta y campo: `6–8 px`.
- Separación entre campo y ayuda: `4–6 px`.

### Espaciado entre bloques

- Entre título y descripción: `4–8 px`.
- Entre descripción y contenido: `16–24 px`.
- Entre tarjetas: `16–20 px`.
- Entre secciones principales: `24–32 px`.

---

## 9. Cuadrícula y alineación

### Ancho de referencia

- Diseño principal: `1440 px`.
- Uso previsto: computadora de escritorio.

### Márgenes recomendados

- Margen horizontal del contenido: `24–32 px`.
- Margen vertical: `24–32 px`.

### Cuadrícula

Los contenidos pueden organizarse en:

- Una columna para información extensa.
- Dos columnas para bloques relacionados.
- Tres columnas para formularios normales.
- Cuatro columnas para filtros compactos.

### Reglas de alineación

- Las etiquetas deben alinearse con sus campos.
- Los botones relacionados deben compartir la misma altura.
- Los valores numéricos pueden alinearse a la derecha.
- Los textos generales deben alinearse a la izquierda.
- Los encabezados de tabla deben respetar la alineación de sus columnas.
- No se deben centrar párrafos largos.

---

## 10. Esquinas redondeadas

### Radio principal

**Valor:** `8 px`

Se utiliza en:

- Botones.
- Campos.
- Selectores.
- Tarjetas.
- Avisos.
- Contenedores.

```css
--radio-principal: 8px;
```

### Radios adicionales

- Etiquetas pequeñas: `5–6 px`.
- Indicadores circulares: `50%`.
- Etiquetas de estado: `999 px`.
- Ventanas destacadas: `10–12 px`.

No se recomienda utilizar radios superiores a `12 px` en tarjetas institucionales.

---

## 11. Bordes

### Borde estándar

```css
border: 1px solid #D9DEE5;
```

Se utiliza en:

- Campos.
- Tarjetas.
- Tablas.
- Botones secundarios.
- Separadores.

### Borde activo

```css
border-color: #1677C8;
```

Debe acompañarse con un halo suave.

### Borde de error

```css
border-color: #D64545;
```

Debe utilizarse únicamente cuando exista un error.

### Separadores

- Grosor: `1 px`.
- Color: `#E9ECF0` o `#D9DEE5`.
- Deben utilizarse para organizar, no para encerrar cada elemento.

---

## 12. Sombras

Las sombras deben ser suaves y discretas.

### Sombra de tarjeta

```css
box-shadow: 0 2px 9px rgba(20, 45, 70, 0.04);
```

### Sombra elevada

Se utiliza en ventanas o mensajes emergentes.

```css
box-shadow: 0 12px 35px rgba(20, 45, 70, 0.16);
```

### Sombra de barra fija

```css
box-shadow: 0 -4px 18px rgba(20, 45, 70, 0.10);
```

### Reglas

- No utilizar sombras negras intensas.
- No utilizar más de una sombra en el mismo elemento.
- Las sombras no deben sustituir a los bordes.
- Una tarjeta normal debe tener menor elevación que una ventana.

---

## 13. Iconografía

### Estilo

- Iconos lineales.
- Trazos simples.
- Extremos redondeados.
- Grosor uniforme.
- Sin rellenos decorativos innecesarios.

### Tamaños

- Icono pequeño: `16 px`.
- Icono normal: `20 px`.
- Icono destacado: `24 px`.
- Icono de estado: `24–32 px`.

### Colores

- Heredan el color del texto o botón.
- Azul para acciones informativas.
- Verde para éxito.
- Rojo para error o peligro.
- Amarillo para advertencia.
- Blanco sobre fondos oscuros.

### Reglas de uso

- Un icono no debe reemplazar una etiqueta importante.
- Las acciones principales deben conservar texto visible.
- Los iconos deben incluir una descripción accesible cuando aparezcan solos.
- No se deben mezclar iconos lineales con iconos tridimensionales.

---

## 14. Estados interactivos

### Estado normal

- Muestra los colores y bordes definidos para el elemento.

### Al pasar el cursor

- Debe cambiar suavemente el fondo, borde o color.
- La transición recomendada es de `150–200 ms`.
- No debe modificar el tamaño del elemento.

### En foco

Los controles deben mostrar:

- Borde azul.
- Halo exterior suave.

```css
border-color: #1677C8;
box-shadow: 0 0 0 3px rgba(22, 119, 200, 0.10);
```

### Presionado

- Puede utilizar un azul ligeramente más oscuro.
- No debe producir movimiento excesivo.

### Deshabilitado

- Opacidad recomendada: `45–55%`.
- Cursor no permitido.
- Sin sombra.
- No debe responder a interacción.

### Solo lectura

- Fondo gris claro.
- Texto secundario.
- Cursor normal.
- Debe diferenciarse de un campo editable.

---

## 15. Estados semánticos

### Éxito

- Color principal: `#2E9E5B`.
- Fondo recomendado: `#E8F6EE`.
- Texto recomendado: `#247B49`.
- Icono: marca de verificación.

### Error

- Color principal: `#D64545`.
- Fondo recomendado: `#FDECEC`.
- Texto recomendado: `#B73333`.
- Icono: signo de exclamación o error.

### Advertencia

- Color principal: `#F5B400`.
- Fondo recomendado: `#FFF4D1`.
- Texto recomendado: `#6C5516`.
- Icono: signo de exclamación.

### Información

- Color principal: `#1677C8`.
- Fondo recomendado: `#EAF4FC`.
- Texto recomendado: `#0D4F8B`.
- Icono: información.

---

## 16. Formularios

### Altura de controles

- Altura mínima: `42 px`.
- Altura recomendada para acciones principales: `44–46 px`.

### Etiquetas

- Siempre deben permanecer visibles.
- Se colocan encima del campo.
- Utilizan peso semibold.
- Los campos obligatorios muestran un asterisco rojo.

### Texto de ejemplo

- Debe explicar el formato esperado.
- Color recomendado: `#98A1AD`.
- No debe sustituir a la etiqueta.

### Validación

Un campo con error debe mostrar:

- Borde rojo.
- Mensaje debajo del campo.
- Icono opcional.

Ejemplo:

> Ingrese un número de identidad válido.

Un campo correcto puede mostrar:

- Borde verde.
- Icono de confirmación.

### Agrupación

- Los campos relacionados deben permanecer juntos.
- Los grupos deben tener un título claro.
- Las preguntas Sí/No deben colocarse cerca de sus campos condicionales.

---

## 17. Tablas

### Encabezado

- Fondo azul claro.
- Texto azul oscuro.
- Peso semibold.
- Altura suficiente para facilitar la lectura.

### Filas

- Fondo blanco.
- Separador inferior gris claro.
- Altura mínima recomendada: `48 px`.

### Fila al pasar el cursor

- Fondo recomendado: `#F8FBFD`.

### Fila seleccionada

- Fondo azul muy claro.
- No debe alterar el color del texto principal.

### Celdas

- Espaciado horizontal: `12–16 px`.
- Espaciado vertical: `12–14 px`.
- Texto alineado a la izquierda.
- Cantidades alineadas a la derecha cuando sea necesario.

### Pie de tabla

- Fondo gris claro.
- Texto semibold.
- Puede mostrar totales.

### Tablas extensas

- Deben permitir desplazamiento horizontal si no existe espacio suficiente.
- Los encabezados deben permanecer claros.
- No se debe reducir excesivamente la tipografía para evitar desplazamiento.

---

## 18. Botones

### Botón primario

```css
background: #1677C8;
color: #FFFFFF;
border: 1px solid #1677C8;
border-radius: 8px;
```

Al pasar el cursor:

```css
background: #0E66AD;
border-color: #0E66AD;
```

### Botón secundario

```css
background: #FFFFFF;
color: #1677C8;
border: 1px solid #1677C8;
border-radius: 8px;
```

Al pasar el cursor:

```css
background: #EAF4FC;
```

### Botón de peligro

```css
background: #D64545;
color: #FFFFFF;
border: 1px solid #D64545;
border-radius: 8px;
```

### Jerarquía

- Una sección debe tener una sola acción primaria visible.
- Las acciones secundarias pueden acompañar a la principal.
- Las acciones peligrosas no deben parecer acciones principales.
- “Cancelar” debe utilizar estilo secundario.

---

## 19. Tarjetas y superficies

### Tarjeta normal

```css
background: #FFFFFF;
border: 1px solid #E1E5EA;
border-radius: 8px;
box-shadow: 0 2px 9px rgba(20, 45, 70, 0.04);
```

### Espaciado

- Interior mínimo: `20 px`.
- Interior recomendado: `24 px`.
- Separación entre tarjetas: `16–20 px`.

### Reglas

- Cada tarjeta debe agrupar contenido relacionado.
- No se deben colocar tarjetas dentro de tarjetas sin necesidad.
- Las tarjetas no deben utilizar bordes de colores decorativos.
- Los títulos deben aparecer al inicio.

---

## 20. Etiquetas y distintivos

### Etiquetas académicas

- Fondo azul claro.
- Texto azul oscuro.
- Peso semibold.
- Radio de `5–6 px`.

### Etiquetas de estado

- Forma de cápsula.
- Indicador circular.
- Texto semibold.
- Fondo suave asociado al estado.

### Reglas

- Deben contener textos breves.
- No deben utilizarse para párrafos.
- El color no debe ser el único indicador del estado.

---

## 21. Avisos y mensajes

### Estructura recomendada

1. Icono.
2. Título.
3. Descripción.
4. Acción opcional.

### Mensaje emergente

- Posición recomendada: esquina inferior derecha.
- Ancho recomendado: `320–380 px`.
- Fondo blanco.
- Borde asociado al estado.
- Sombra elevada.
- Cierre manual y automático opcional.

### Ventana de confirmación

- Ancho recomendado: `420–480 px`.
- Fondo blanco.
- Radio: `10–12 px`.
- Fondo exterior oscuro semitransparente.
- Pregunta breve.
- Explicación clara.
- Acción primaria o peligrosa.
- Acción secundaria para cancelar.

---

## 22. Movimiento y transiciones

Las transiciones deben ser discretas.

### Duraciones

- Interacción rápida: `150 ms`.
- Interacción normal: `180–200 ms`.
- Ventanas y mensajes: `200–250 ms`.

### Propiedades permitidas

- Color.
- Fondo.
- Borde.
- Opacidad.
- Sombra.
- Transformación leve.

### Reglas

- No utilizar rebotes.
- No utilizar giros decorativos.
- No mover formularios durante la interacción.
- No retrasar acciones administrativas.
- Respetar las preferencias de movimiento reducido del sistema.

---

## 23. Accesibilidad

### Contraste

- El texto normal debe mantener una relación mínima de contraste de `4.5:1`.
- Los textos grandes deben mantener una relación mínima de `3:1`.
- Los controles y bordes importantes deben distinguirse del fondo.

### Tamaño

- Texto importante: mínimo `14 px`.
- Área interactiva recomendada: mínimo `40 × 40 px`.
- Controles de formulario: mínimo `42 px` de alto.

### Teclado

- Todos los controles deben poder utilizarse con teclado.
- El foco debe permanecer visible.
- El orden de navegación debe coincidir con el orden visual.

### Formularios

- Cada campo debe tener una etiqueta.
- Los errores deben describirse con texto.
- Los campos obligatorios deben indicarse visualmente y de forma textual.
- El color no debe ser el único recurso para comunicar un estado.

### Iconos

- Los iconos decorativos deben ocultarse para lectores de pantalla.
- Los iconos que funcionen como acción deben tener una descripción.

---

## 24. Diseño para escritorio

La interfaz está diseñada principalmente para un ancho de `1440 px`.

### Recomendaciones

- Mantener el contenido principal dentro del espacio disponible.
- Evitar líneas de texto demasiado largas.
- Utilizar columnas para reducir desplazamientos innecesarios.
- Conservar visibles las acciones principales.
- Mantener suficiente espacio entre controles.

### Ancho mínimo recomendado

- `1180 px`.

Si el ancho es menor:

- Las tablas pueden usar desplazamiento horizontal.
- Las cuadrículas pueden reducir el número de columnas.
- Los botones deben conservar su altura.
- La tipografía no debe reducirse por debajo del mínimo establecido.

---

## 25. Estilos de impresión

Los documentos impresos deben utilizar:

- Fondo blanco.
- Texto negro.
- Bordes grises o negros.
- Sin sombras.
- Sin fondos decorativos.
- Sin controles de navegación.
- Sin botones.

### Tipografía de impresión

- Arial o una fuente sans serif disponible.
- Texto general: `10–11 pt`.
- Títulos: `12–16 pt`.
- Encabezado institucional: peso bold.

### Papel

- Tamaño carta.
- Márgenes seguros.
- Contenido dentro de una sola página cuando sea posible.

### Logotipo

- Puede utilizarse en versión monocromática.
- Debe conservar proporciones.

---

## 26. Variables recomendadas

```css
:root {
  --color-azul-primario: #1677C8;
  --color-azul-oscuro: #0D4F8B;
  --color-azul-claro: #EAF4FC;
  --color-amarillo-dorado: #F5B400;
  --color-amarillo-suave: #FFF4D1;
  --color-texto: #1A1A1A;
  --color-texto-secundario: #5F6B7A;
  --color-borde: #D9DEE5;
  --color-fondo: #F5F7FA;
  --color-superficie: #FFFFFF;
  --color-exito: #2E9E5B;
  --color-error: #D64545;

  --radio-principal: 8px;
  --radio-ventana: 12px;
  --radio-circular: 999px;

  --espacio-1: 4px;
  --espacio-2: 8px;
  --espacio-3: 12px;
  --espacio-4: 16px;
  --espacio-5: 20px;
  --espacio-6: 24px;
  --espacio-8: 32px;
  --espacio-10: 40px;

  --sombra-tarjeta: 0 2px 9px rgba(20, 45, 70, 0.04);
  --sombra-elevada: 0 12px 35px rgba(20, 45, 70, 0.16);

  --transicion-rapida: 150ms ease;
  --transicion-normal: 200ms ease;
}
```

---

## 27. Lista de verificación visual

Antes de aprobar una modificación se debe confirmar:

- [ ] Se utiliza Inter o la tipografía alternativa permitida.
- [ ] El texto importante tiene al menos `14 px`.
- [ ] Los títulos utilizan azul oscuro.
- [ ] Las acciones principales utilizan azul primario.
- [ ] El amarillo se utiliza únicamente como acento o advertencia.
- [ ] Los errores utilizan rojo.
- [ ] Los estados correctos utilizan verde.
- [ ] Los controles tienen una altura mínima de `42 px`.
- [ ] Las esquinas principales tienen `8 px`.
- [ ] Los campos muestran etiquetas visibles.
- [ ] El foco de teclado es claramente visible.
- [ ] Las tarjetas utilizan fondo blanco.
- [ ] El fondo general utiliza gris azulado claro.
- [ ] Las sombras son suaves.
- [ ] Existe suficiente espacio entre elementos.
- [ ] El color no es el único indicador de estado.
- [ ] Los textos mantienen un contraste adecuado.
- [ ] La versión impresa elimina colores y elementos innecesarios.
