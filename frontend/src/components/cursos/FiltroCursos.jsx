import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Campo from '../ui/Campo';
import Tarjeta from '../ui/Tarjeta';
import { NIVELES } from './niveles';

// Botones de ícono con borde suave: grises y azules al pasar el cursor
const iconoSx = {
  width: 40,
  height: 40,
  border: 1,
  borderColor: 'divider',
  borderRadius: 2,
  color: 'text.secondary',
  '&:hover': { color: 'primary.main', borderColor: 'primary.main', bgcolor: 'primary.light' },
};

export const filtroVacio = { texto: '', idCurso: '', numeroSeccion: '', nivel: '' };

/**
 * Barra de filtros de cursos y secciones.
 * - texto: busca por nombre o código del curso, o por sección (ej. "7mo-1").
 * - idCurso, numeroSeccion, nivel: listas desplegables ("" = todos).
 * - vista: botón que alterna las tarjetas entre "cuadricula" y "lista".
 */
export default function FiltroCursos({ cursos = [], filtro, onCambiar, vista = 'cuadricula', onCambiarVista }) {
  const numerosSeccion = [...new Set(cursos.flatMap((c) => (c.secciones ?? []).map((s) => s.numero)))].sort((a, b) => a - b);
  const hayFiltros = Object.values(filtro).some((valor) => valor !== '');

  const cambiar = (campo) => (event) => onCambiar({ ...filtro, [campo]: event.target.value });

  return (
    <Tarjeta sx={{ px: 2.25, py: 2, mb: 2.25 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '4fr repeat(3, 1fr) auto auto' },
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
        <Tooltip title="Limpiar filtros">
          {/* El span permite mostrar el texto de ayuda aunque el botón esté deshabilitado */}
          <span>
            <IconButton
              aria-label="Limpiar filtros"
              disabled={!hayFiltros}
              onClick={() => onCambiar(filtroVacio)}
              sx={iconoSx}
            >
              <FilterAltOffIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={vista === 'lista' ? 'Ver como cuadrícula' : 'Ver como lista'}>
          <IconButton
            aria-label={vista === 'lista' ? 'Ver como cuadrícula' : 'Ver como lista'}
            onClick={() => onCambiarVista(vista === 'lista' ? 'cuadricula' : 'lista')}
            sx={iconoSx}
          >
            {vista === 'lista' ? <GridViewOutlinedIcon fontSize="small" /> : <ViewListOutlinedIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
    </Tarjeta>
  );
}
