import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Aviso amarillo para información importante que el usuario debe tener en cuenta
export default function AvisoImportante({ titulo = 'Importante', children, sx }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.375,
        px: 1.875,
        py: 1.625,
        mb: 2.25,
        bgcolor: 'secondary.light',
        border: '1px solid #EFD46F',
        borderRadius: 2,
        color: '#6C5516',
        ...sx,
      }}
    >
      <Box
        component="span"
        sx={{
          width: 23,
          height: 23,
          flexShrink: 0,
          display: 'grid',
          placeItems: 'center',
          borderRadius: '50%',
          bgcolor: 'secondary.main',
          color: '#FFFFFF',
          fontWeight: 800,
        }}
      >
        !
      </Box>
      <Typography sx={{ fontSize: 13 }}>
        <Box component="strong" sx={{ display: 'block', color: '#604B0E', mb: 0.25 }}>
          {titulo}
        </Box>
        {children}
      </Typography>
    </Box>
  );
}
