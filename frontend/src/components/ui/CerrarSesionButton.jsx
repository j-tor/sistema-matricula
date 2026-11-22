import { useState } from 'react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import api, { terminarSesion } from '../../services/api';

export default function CerrarSesionButton({ sx, ...props }) {
  const [estado, setEstado] = useState('listo');

  async function cerrar() {
    setEstado('cerrando');
    try {
      await api.post('/autenticacion/logout');
      terminarSesion();
    } catch (error) {
      if (error.response?.status !== 401) setEstado('error');
    }
  }

  return (
    <Button {...props} startIcon={<LogoutIcon />} onClick={cerrar} disabled={estado === 'cerrando'} sx={sx}>
      {estado === 'error' ? 'Reintentar cierre de sesión' : 'Cerrar sesión'}
    </Button>
  );
}
