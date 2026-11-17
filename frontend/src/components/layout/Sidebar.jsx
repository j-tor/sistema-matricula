import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Logo from '../ui/Logo';
import CerrarSesionButton from '../ui/CerrarSesionButton';
import menu from './menu';

export const SIDEBAR_WIDTH = 250;

const itemSx = {
  position: 'relative',
  height: 50,
  px: 2.75,
  gap: 1.625,
  justifyContent: 'flex-start',
  color: '#D4E5F3',
  fontSize: 14,
  fontWeight: 500,
  borderRadius: 0,
  '&:hover': { bgcolor: 'rgba(255,255,255,.08)', color: '#FFFFFF' },
  // NavLink agrega la clase "active" a la opción de la página actual
  '&.active': { bgcolor: 'rgba(255,255,255,.13)', color: '#FFFFFF', fontWeight: 600 },
  '&.active::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    width: 5,
    height: 32,
    borderRadius: '0 4px 4px 0',
    bgcolor: 'secondary.main',
  },
};

export default function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        width: SIDEBAR_WIDTH,
        bgcolor: 'primary.dark',
        color: '#FFFFFF',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 20,
        overflowY: 'auto',
      }}
    >
      {/* Identidad institucional */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, pt: 3.25, pb: 2.75 }}>
        <Logo />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700 }}>CEMG Técnico</Typography>
          <Typography sx={{ fontSize: 11, color: '#C6DFF2', lineHeight: 1.35 }}>“Dr. Jorge Fidel Durón”</Typography>
        </Box>
      </Box>
      <Box sx={{ mx: 2.5, mb: 2, height: '1px', bgcolor: 'rgba(255,255,255,.13)' }} />

      {/* Opciones del menú */}
      <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {menu.map(({ label, path, icon: Icon, atajo }) => (
          <ButtonBase key={path} component={NavLink} to={path} end={path === '/'} sx={itemSx}>
            <Icon sx={{ fontSize: 20 }} />
            <span>{label}</span>
            {atajo && (
              <Box
                component="span"
                sx={{
                  ml: 'auto',
                  width: 24,
                  height: 24,
                  borderRadius: '5px',
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: 'rgba(255,255,255,.13)',
                }}
              >
                +
              </Box>
            )}
          </ButtonBase>
        ))}
      </Box>

      {/* Ubicación del centro educativo */}
      <Box
        sx={{
          mt: 'auto',
          mx: 2.5,
          mb: 2,
          p: 1.75,
          bgcolor: 'rgba(0,0,0,.12)',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 2,
        }}
      >
        <Typography
          sx={{ fontSize: 10, textTransform: 'uppercase', color: '#9CC8E8', fontWeight: 700, letterSpacing: '.06em' }}
        >
          Centro educativo
        </Typography>
        <Typography sx={{ fontSize: 11, color: '#D4E5F3', mt: 0.75, lineHeight: 1.6 }}>
          San Francisco de Yojoa
          <br />
          Cortés, Honduras
        </Typography>
      </Box>

      <CerrarSesionButton
        sx={{
          ...itemSx,
          width: '100%',
          height: 58,
          borderTop: '1px solid rgba(255,255,255,.12)',
          '& .MuiButton-startIcon': { mr: 0, ml: 0 },
        }}
      />
    </Box>
  );
}
