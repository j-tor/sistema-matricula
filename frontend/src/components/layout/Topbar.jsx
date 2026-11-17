import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

const iniciales = (nombre) =>
  nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('');

/**
 * Barra superior con el título de la pantalla, el año lectivo y el usuario conectado.
 * Solo visual: el usuario y los años se recibirán del backend cuando exista la sesión.
 */
export default function Topbar({ titulo, usuario, aniosLectivos = [], anioLectivo = '' }) {
  return (
    <Box
      component="header"
      sx={{
        height: 86,
        px: 4,
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 15,
      }}
    >
      <Box>
        <Typography sx={{ color: 'text.secondary', fontSize: 11, mb: 0.375 }}>Sistema de Matrícula Estudiantil</Typography>
        <Typography component="h1" sx={{ fontSize: 22, color: 'primary.dark', fontWeight: 700 }}>
          {titulo}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3.25, alignItems: 'center' }}>
        <Box component="label" sx={{ display: 'flex', alignItems: 'center', gap: 1.125 }}>
          <Typography component="span" sx={{ fontSize: 12, color: 'text.secondary' }}>
            Año lectivo
          </Typography>
          <Select size="small" value={anioLectivo} displayEmpty sx={{ height: 38, minWidth: 90, fontSize: 13 }}>
            {aniosLectivos.length === 0 && <MenuItem value="">—</MenuItem>}
            {aniosLectivos.map((anio) => (
              <MenuItem key={anio} value={anio}>
                {anio}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, borderLeft: 1, borderColor: 'divider', pl: 3 }}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 700, fontSize: 12 }}>
            {usuario?.nombre ? iniciales(usuario.nombre) : null}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
            <Typography component="small" sx={{ color: 'text.secondary', fontSize: 10 }}>
              {usuario?.rol ?? 'Matriculador'}
            </Typography>
            <Typography component="strong" sx={{ fontSize: 12, fontWeight: 700 }}>
              {usuario?.nombre ?? ''}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
