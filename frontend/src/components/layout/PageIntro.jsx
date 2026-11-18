import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Encabezado de cada pantalla: antetítulo opcional, título, descripción
 * y, a la derecha, las acciones principales (botones).
 */
export default function PageIntro({ antetitulo, titulo, descripcion, acciones }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2.75 }}>
      <Box>
        {antetitulo && (
          <Typography sx={{ color: 'primary.main', fontWeight: 700, fontSize: 11, letterSpacing: '.09em' }}>
            {antetitulo}
          </Typography>
        )}
        <Typography
          component="h2"
          sx={{ color: 'primary.dark', fontSize: 25, fontWeight: 700, letterSpacing: '-.02em', mt: 0.5, mb: 0.625 }}
        >
          {titulo}
        </Typography>
        {descripcion && <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>{descripcion}</Typography>}
      </Box>
      {acciones && <Box sx={{ display: 'flex', gap: 1.25, flexShrink: 0 }}>{acciones}</Box>}
    </Box>
  );
}
