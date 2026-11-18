// Etiquetas de los valores del enum NivelEducativo del backend
export const NIVELES = {
  BASICA: 'Ciclo básico',
  MEDIA: 'Bachillerato',
};

export const nombreSeccion = (curso, seccion) => `${curso.codigo}-${seccion.numero}`;

const normalizar = (texto) =>
  String(texto ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

/**
 * Aplica la barra de filtros: devuelve los cursos que coinciden, cada uno solo
 * con las secciones que coinciden.
 */
export const filtrarCursos = (cursos, { texto, idCurso, numeroSeccion, nivel }) => {
  const busqueda = normalizar(texto.trim());
  const filtraSeccion = numeroSeccion !== '' || busqueda !== '';

  return cursos
    .filter((curso) => idCurso === '' || curso.idCurso === idCurso)
    .filter((curso) => nivel === '' || curso.nivel === nivel)
    .map((curso) => {
      const coincideCurso =
        busqueda === '' || [curso.codigo, curso.nombre, NIVELES[curso.nivel]].some((v) => normalizar(v).includes(busqueda));

      const secciones = (curso.secciones ?? [])
        .filter((s) => numeroSeccion === '' || s.numero === numeroSeccion)
        .filter((s) => coincideCurso || normalizar(nombreSeccion(curso, s)).includes(busqueda));

      // El total se guarda antes de quitar secciones para que siga siendo el del curso completo
      return { ...curso, totalEstudiantes: totalEstudiantes(curso), secciones };
    })
    .filter((curso) => !filtraSeccion || curso.secciones.length > 0);
};

export const totalEstudiantes = (curso) =>
  curso.totalEstudiantes ??
  (curso.secciones ?? []).reduce((total, seccion) => total + (seccion.totalEstudiantes ?? 0), 0);
