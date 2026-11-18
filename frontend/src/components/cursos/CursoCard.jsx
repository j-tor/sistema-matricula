import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { NIVELES, nombreSeccion, totalEstudiantes } from './niveles';

const accionSx = { fontSize: 12, minHeight: 'auto', px: 1, py: 0.5, whiteSpace: 'nowrap' };

const tarjetaSx = { border: '1px solid #E1E5EA', boxShadow: '0 2px 9px rgba(20,45,70,.04)' };

// Código, nivel y total de estudiantes del curso
function Identidad({ curso }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.375, alignItems: 'center' }}>
      <Box
        sx={{
          width: 42,
          height: 42,
          flexShrink: 0,
          borderRadius: 2,
          bgcolor: 'primary.dark',
          color: '#FFFFFF',
          display: 'grid',
          placeItems: 'center',
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        {curso.codigo}
      </Box>
      <Box>
        <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{NIVELES[curso.nivel] ?? curso.nivel}</Typography>
        <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25 }}>{totalEstudiantes(curso)} estudiantes</Typography>
      </Box>
    </Box>
  );
}

// Secciones del curso como etiquetas: clic para editar, ✕ para eliminar
function Secciones({ curso, onEditarSeccion, onEliminarSeccion }) {
  const secciones = curso.secciones ?? [];

  if (secciones.length === 0) {
    return (
      <Typography sx={{ fontSize: 12, color: 'text.secondary', fontStyle: 'italic' }}>Este curso aún no tiene secciones.</Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.875 }}>
      {secciones.map((seccion) => (
        <Chip
          key={seccion.idSeccion}
          label={
            <>
              {nombreSeccion(curso, seccion)}
              <Box component="b" sx={{ bgcolor: 'primary.light', ml: 0.625, borderRadius: '10px', px: 0.625, py: 0.25 }}>
                {seccion.totalEstudiantes ?? 0}
              </Box>
            </>
          }
          title="Editar sección"
          onClick={() => onEditarSeccion(curso, seccion)}
          onDelete={() => onEliminarSeccion(curso, seccion)}
          variant="outlined"
          sx={{
            bgcolor: '#FFFFFF',
            borderColor: '#C9D8E5',
            borderRadius: '5px',
            color: 'primary.dark',
            fontWeight: 600,
            fontSize: 12,
            '& .MuiChip-deleteIcon': { fontSize: 16, color: '#98A1AD', '&:hover': { color: 'error.main' } },
          }}
        />
      ))}
    </Box>
  );
}

/**
 * Tarjeta de un curso con sus secciones activas.
 * curso: { codigo, nivel, secciones: [{ idSeccion, numero, totalEstudiantes }] }
 * vista: "cuadricula" (tarjeta vertical) o "lista" (una fila a lo ancho).
 */
export default function CursoCard({
  curso,
  vista = 'cuadricula',
  onEditar,
  onEliminar,
  onAgregarSeccion,
  onEditarSeccion,
  onEliminarSeccion,
}) {
  const botonEditar = (
    <Button size="small" startIcon={<EditOutlinedIcon />} onClick={() => onEditar(curso)} sx={accionSx}>
      Editar
    </Button>
  );
  const botonAgregar = (
    <Button size="small" startIcon={<AddIcon />} onClick={() => onAgregarSeccion(curso)} sx={accionSx}>
      Agregar sección
    </Button>
  );
  const botonEliminar = (
    <Button size="small" color="error" onClick={() => onEliminar(curso)} sx={accionSx}>
      Eliminar
    </Button>
  );
  const secciones = <Secciones curso={curso} onEditarSeccion={onEditarSeccion} onEliminarSeccion={onEliminarSeccion} />;

  if (vista === 'lista') {
    return (
      <Paper
        elevation={0}
        sx={{
          ...tarjetaSx,
          px: 2.25,
          py: 1.75,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '220px 1fr auto' },
          alignItems: 'center',
          gap: { xs: 1.5, md: 2.5 },
        }}
      >
        <Identidad curso={curso} />
        <Box sx={{ borderLeft: { md: '1px solid #EDF0F3' }, pl: { md: 2.5 } }}>{secciones}</Box>
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
          {botonEditar}
          {botonAgregar}
          {botonEliminar}
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} sx={{ ...tarjetaSx, p: 2.25, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Identidad curso={curso} />
        {botonEditar}
      </Box>

      <Box sx={{ my: 2.25, p: 1.625, bgcolor: 'background.default', borderRadius: '7px' }}>
        <Typography sx={{ fontSize: 12, color: 'text.secondary', mb: 1.125 }}>Secciones activas</Typography>
        {secciones}
      </Box>

      <Box sx={{ mt: 'auto', borderTop: '1px solid #EDF0F3', pt: 1.625, display: 'flex', justifyContent: 'space-between' }}>
        {botonAgregar}
        {botonEliminar}
      </Box>
    </Paper>
  );
}
