import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Sidebar, { SIDEBAR_WIDTH } from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import menu from '../components/layout/menu';
// DATOS DE EJEMPLO: reemplazar por el usuario de la sesión y los años del backend
import { usuarioEjemplo, aniosLectivosEjemplo } from '../mocks/sesion';

// Estructura común de las pantallas: menú lateral fijo + barra superior + contenido
export default function AppLayout() {
  const { pathname } = useLocation();
  const opcionActual = menu.find((opcion) => opcion.path === pathname);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar />
      <Box sx={{ ml: `${SIDEBAR_WIDTH}px`, width: `calc(100% - ${SIDEBAR_WIDTH}px)` }}>
        <Topbar
          titulo={opcionActual?.label ?? ''}
          usuario={usuarioEjemplo}
          aniosLectivos={aniosLectivosEjemplo}
          anioLectivo={aniosLectivosEjemplo[0]}
        />
        <Box component="main" sx={{ px: 4, pt: 3.5, pb: 6.25, maxWidth: 1600, mx: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
