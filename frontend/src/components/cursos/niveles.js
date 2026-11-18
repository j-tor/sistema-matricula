// Etiquetas de los valores del enum NivelEducativo del backend
export const NIVELES = {
  BASICA: 'Ciclo básico',
  MEDIA: 'Bachillerato',
};

export const nombreSeccion = (curso, seccion) => `${curso.codigo}-${seccion.numero}`;

export const totalEstudiantes = (curso) =>
  (curso.secciones ?? []).reduce((total, seccion) => total + (seccion.totalEstudiantes ?? 0), 0);
