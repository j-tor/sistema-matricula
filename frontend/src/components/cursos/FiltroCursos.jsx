import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Campo from '../ui/Campo';
import Tarjeta from '../ui/Tarjeta';
import { NIVELES } from './niveles';

export const filtroVacio = { texto: '', idCurso: '', numeroSeccion: '', nivel: '' };

/**
 * Barra de filtros de cursos y secciones.
 * - texto: busca por nombre o código del curso, o por sección (ej. "7mo-1").
 * - idCurso, numeroSeccion, nivel: listas desplegables ("" = todos).
 */
export default function FiltroCursos({ cursos = [], filtro, onCambiar }) {
  const numerosSeccion = [...new Set(cursos.flatMap((c) => (c.secciones ?? []).map((s) => s.numero)))].sort((a, b) => a - b);
  const hayFiltros = Object.values(filtro).some((valor) => valor !== '');

  const cambiar = (campo) => (event) => onCambiar({ ...filtro, [campo]: event.target.value });

  return (
    <Tarjeta sx={{ px: 2.25, py: 2, mb: 2.25 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr repeat(3, 1fr) auto' },
          gap: 1.5,
          alignItems: 'end',
        }}
      >
        <Campo
          label="Buscar"
          placeholder="Curso o sección (ej. 7mo-1)"
          value={filtro.texto}
          onChange={cambiar('texto')}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <Campo label="Curso" select value={filtro.idCurso} onChange={cambiar('idCurso')} slotProps={{ select: { displayEmpty: true } }}>
          <MenuItem value="">Todos</MenuItem>
          {cursos.map((curso) => (
            <MenuItem key={curso.idCurso} value={curso.idCurso}>
              {curso.codigo}
            </MenuItem>
          ))}
        </Campo>
        <Campo
          label="Sección"
          select
          value={filtro.numeroSeccion}
          onChange={cambiar('numeroSeccion')}
          slotProps={{ select: { displayEmpty: true } }}
        >
          <MenuItem value="">Todas</MenuItem>
          {numerosSeccion.map((numero) => (
            <MenuItem key={numero} value={numero}>
              {numero}
            </MenuItem>
          ))}
        </Campo>
        <Campo label="Nivel" select value={filtro.nivel} onChange={cambiar('nivel')} slotProps={{ select: { displayEmpty: true } }}>
          <MenuItem value="">Todos</MenuItem>
          {Object.entries(NIVELES).map(([valor, etiqueta]) => (
            <MenuItem key={valor} value={valor}>
              {etiqueta}
            </MenuItem>
          ))}
        </Campo>
        <Button variant="outlined" disabled={!hayFiltros} onClick={() => onCambiar(filtroVacio)} sx={{ height: 40 }}>
          Limpiar filtros
        </Button>
      </Box>
    </Tarjeta>
  );
}
