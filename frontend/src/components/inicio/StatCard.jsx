import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tarjeta from '../ui/Tarjeta';

const colores = {
  azul: { color: 'primary.main', bgcolor: 'primary.light' },
  dorado: { color: '#AD7D00', bgcolor: 'secondary.light' },
  marino: { color: 'primary.dark', bgcolor: '#E8EEF4' },
  verde: { color: 'success.main', bgcolor: '#EAF7EF' },
};

// Tarjeta de un total de la pantalla de inicio
export default function StatCard({ icono: Icono, color = 'azul', titulo, valor, detalle }) {
  return (
    <Tarjeta sx={{ minHeight: 132, p: 2.625, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 47,
          height: 47,
          flex: '0 0 auto',
          display: 'grid',
          placeItems: 'center',
          borderRadius: 2,
          ...colores[color],
        }}
      >
        <Icono />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ color: 'text.secondary', fontSize: 12, mb: 0.625 }}>{titulo}</Typography>
        <Typography sx={{ fontSize: 29, fontWeight: 700, color: 'primary.dark', lineHeight: 1 }}>{valor}</Typography>
        {detalle && (
          <Typography component="div" sx={{ color: 'text.secondary', fontSize: 11, mt: 1, '& b': { color: 'success.main' } }}>
            {detalle}
          </Typography>
        )}
      </Box>
    </Tarjeta>
  );
}
