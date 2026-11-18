import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

/**
 * Ventana de confirmación antes de acciones importantes (eliminar, retirar, anular).
 * Con `soloAviso` muestra únicamente el botón "Entendido": sirve para avisar
 * que una acción no se puede realizar.
 */
export default function ConfirmDialog({
  abierto,
  titulo,
  mensaje,
  textoConfirmar = 'Confirmar',
  soloAviso = false,
  onCancelar,
  onConfirmar,
}) {
  return (
    <Dialog
      open={abierto}
      onClose={onCancelar}
      slotProps={{
        paper: { sx: { width: 440, borderRadius: '10px', p: 3.75, textAlign: 'center' } },
        backdrop: { sx: { bgcolor: 'rgba(8,29,47,.55)', backdropFilter: 'blur(2px)' } },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          mx: 'auto',
          mb: 2,
          display: 'grid',
          placeItems: 'center',
          borderRadius: '50%',
          bgcolor: soloAviso ? '#FFF0F0' : 'secondary.light',
          color: soloAviso ? 'error.main' : '#9A7000',
          fontSize: 20,
          fontWeight: 800,
        }}
      >
        !
      </Box>
      <Typography component="h2" sx={{ color: 'primary.dark', fontSize: 18, fontWeight: 700, lineHeight: 1.4 }}>
        {titulo}
      </Typography>
      {mensaje && (
        <Typography sx={{ color: 'text.secondary', fontSize: 13, lineHeight: 1.6, mt: 1.25 }}>{mensaje}</Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.25, mt: 3 }}>
        {soloAviso ? (
          <Button variant="contained" onClick={onCancelar}>
            Entendido
          </Button>
        ) : (
          <>
            <Button variant="outlined" onClick={onCancelar}>
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={onConfirmar}>
              {textoConfirmar}
            </Button>
          </>
        )}
      </Box>
    </Dialog>
  );
}
