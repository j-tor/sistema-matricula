import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tarjeta, { TarjetaEncabezado } from '../ui/Tarjeta';

const iniciales = (nombre) =>
  nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('');

const coloresAvatar = [
  { bgcolor: 'primary.light', color: 'primary.dark' },
  { bgcolor: 'secondary.light', color: '#876300' },
];

// Matrículas registradas por cada matriculador y las registradas hoy
export default function PorMatriculador({ matriculadores = [], hoy }) {
  return (
    <Tarjeta sx={{ minHeight: 325 }}>
      <TarjetaEncabezado titulo="Por matriculador" descripcion="Actividad del año actual" />

      {matriculadores.map((persona, i) => (
        <Box
          key={persona.nombre}
          sx={{ display: 'flex', alignItems: 'center', py: 1.5, borderBottom: '1px solid #EEF0F3' }}
        >
          <Avatar sx={{ width: 36, height: 36, fontSize: 11, fontWeight: 700, ...coloresAvatar[i % 2] }}>
            {iniciales(persona.nombre)}
          </Avatar>
          <Box sx={{ ml: 1.25, display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{persona.nombre}</Typography>
            <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.375 }}>{persona.matriculas} matrículas</Typography>
          </Box>
          <Typography sx={{ ml: 'auto', color: 'primary.dark', fontSize: 13, fontWeight: 700 }}>{persona.porcentaje}%</Typography>
        </Box>
      ))}

      {hoy && (
        <Box
          sx={{
            mt: 2.25,
            p: 1.625,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            bgcolor: 'secondary.light',
            borderLeft: '4px solid',
            borderColor: 'secondary.main',
            borderRadius: '6px',
          }}
        >
          <Typography sx={{ fontSize: 23, fontWeight: 700, color: '#866200' }}>{hoy.matriculas}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Matrículas registradas hoy</Typography>
            <Typography sx={{ fontSize: 11, color: '#806E43', mt: 0.375 }}>Última actualización: {hoy.actualizado}</Typography>
          </Box>
        </Box>
      )}
    </Tarjeta>
  );
}
