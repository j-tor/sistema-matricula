import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * Botón "Cerrar sesión". Por ahora solo regresa a la pantalla de inicio de sesión;
 * el menú lateral (#26) lo reutilizará con su propio estilo mediante `sx`.
 */
export default function CerrarSesionButton({ sx, ...props }) {
  const navigate = useNavigate();

  return (
    <Button startIcon={<LogoutIcon />} onClick={() => navigate('/login')} sx={sx} {...props}>
      Cerrar sesión
    </Button>
  );
}
