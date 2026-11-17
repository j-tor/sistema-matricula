// DATOS DE EJEMPLO (tomados del diseño). Borrar cuando se conecte el backend.
const resumenInicioEjemplo = {
  anio: 2025,
  totales: {
    matriculados: 428,
    nuevosSemana: 36,
    promedioPorCurso: 71,
    bachillerato: 126,
    misMatriculas: 214,
    porcentajeMias: 50,
  },
  porCurso: [
    { curso: '7mo', estudiantes: 68 },
    { curso: '8vo', estudiantes: 82 },
    { curso: '9no', estudiantes: 61 },
    { curso: '10mo', estudiantes: 74 },
    { curso: '11vo', estudiantes: 52 },
    { curso: '12vo', estudiantes: 45 },
  ],
  porMatriculador: [
    { nombre: 'Andrea Martínez', matriculas: 214, porcentaje: 50 },
    { nombre: 'José Lagos', matriculas: 214, porcentaje: 50 },
  ],
  hoy: { matriculas: 12, actualizado: '10:42 a. m.' },
  porSeccion: [
    { seccion: '7mo-1', estudiantes: 36 },
    { seccion: '7mo-2', estudiantes: 32 },
    { seccion: '8vo-1', estudiantes: 40 },
    { seccion: '8vo-2', estudiantes: 42 },
    { seccion: '9no-1', estudiantes: 31 },
    { seccion: '9no-2', estudiantes: 30 },
  ],
};

export default resumenInicioEjemplo;
