import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// Tarjeta blanca con borde suave, base de los bloques de contenido
export default function Tarjeta({ children, sx }) {
  return (
    <Paper
      elevation={0}
      sx={{ p: 2.75, border: '1px solid #E1E5EA', boxShadow: '0 2px 9px rgba(20,45,70,.04)', ...sx }}
    >
      {children}
    </Paper>
  );
}

// Encabezado de tarjeta: título, descripción y un elemento opcional a la derecha
export function TarjetaEncabezado({ titulo, descripcion, extra }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
      <Box>
        <Typography component="h3" sx={{ color: 'primary.dark', fontSize: 16, fontWeight: 700 }}>
          {titulo}
        </Typography>
        {descripcion && <Typography sx={{ color: 'text.secondary', fontSize: 12, mt: 0.5 }}>{descripcion}</Typography>}
      </Box>
      {extra}
    </Box>
  );
}
