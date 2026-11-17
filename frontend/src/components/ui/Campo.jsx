import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

/**
 * Campo de formulario con la etiqueta siempre visible arriba, como en el diseño.
 * Acepta las mismas props que TextField (por ejemplo `select` para listas desplegables).
 */
export default function Campo({ label, required, ayuda, ...props }) {
  return (
    <Box component="label" sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
      <Typography component="span" sx={{ fontSize: 13, fontWeight: 600 }}>
        {label}
        {required && (
          <Box component="b" sx={{ color: 'error.main' }}>
            {' '}
            *
          </Box>
        )}
      </Typography>
      <TextField size="small" fullWidth required={required} {...props} />
      {ayuda && <Typography sx={{ color: 'text.secondary', fontSize: 11 }}>{ayuda}</Typography>}
    </Box>
  );
}
