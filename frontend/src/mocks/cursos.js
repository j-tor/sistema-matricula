// DATOS DE EJEMPLO (tomados del diseño). Borrar cuando se conecte el backend.
const seccion = (idSeccion, numero, totalEstudiantes) => ({ idSeccion, numero, anio: 2025, totalEstudiantes });

export const cursosEjemplo = [
  { idCurso: 1, codigo: '7mo', nombre: 'Séptimo', nivel: 'BASICA', secciones: [seccion(1, 1, 36), seccion(2, 2, 32)] },
  { idCurso: 2, codigo: '8vo', nombre: 'Octavo', nivel: 'BASICA', secciones: [seccion(3, 1, 38), seccion(4, 2, 40)] },
  { idCurso: 3, codigo: '9no', nombre: 'Noveno', nivel: 'BASICA', secciones: [seccion(5, 1, 36), seccion(6, 2, 32)] },
  {
    idCurso: 4,
    codigo: '10mo',
    nombre: 'Décimo',
    nivel: 'MEDIA',
    secciones: [seccion(7, 1, 38), seccion(8, 2, 40), seccion(9, 3, 24)],
  },
  { idCurso: 5, codigo: '11vo', nombre: 'Undécimo', nivel: 'MEDIA', secciones: [seccion(10, 1, 36), seccion(11, 2, 32)] },
  { idCurso: 6, codigo: '12vo', nombre: 'Duodécimo', nivel: 'MEDIA', secciones: [seccion(12, 1, 38), seccion(13, 2, 40)] },
];

export const bachilleratosEjemplo = [
  { idBachillerato: 1, nombre: 'Ciencias y Humanidades' },
  { idBachillerato: 2, nombre: 'Técnico Profesional en Informática' },
  { idBachillerato: 3, nombre: 'Técnico Profesional en Contaduría y Finanzas' },
];
