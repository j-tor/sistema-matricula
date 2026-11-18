import { createTheme } from '@mui/material/styles';

// Colores tomados de la guía de estilos del diseño (ESTILOS.md)
const colores = {
  azul: '#1677C8', // Azul primario
  azulOscuro: '#0D4F8B', // Azul oscuro institucional
  azulClaro: '#EAF4FC',
  dorado: '#F5B400', // Amarillo dorado
  doradoSuave: '#FFF4D1',
  exito: '#2E9E5B',
  error: '#D64545',
  texto: '#1A1A1A',
  textoSecundario: '#5F6B7A',
  borde: '#D9DEE5',
  fondo: '#F5F7FA',
};

const theme = createTheme({
  palette: {
    primary: {
      main: colores.azul,
      dark: colores.azulOscuro,
      light: colores.azulClaro,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: colores.dorado,
      light: colores.doradoSuave,
      contrastText: colores.texto,
    },
    success: { main: colores.exito },
    error: { main: colores.error },
    text: {
      primary: colores.texto,
      secondary: colores.textoSecundario,
    },
    divider: colores.borde,
    background: {
      default: colores.fondo,
      paper: '#FFFFFF',
    },
    institucional: colores,
  },
  typography: {
    fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'].join(','),
    button: {
      textTransform: 'none', // Sin MAYÚSCULAS en botones
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          minHeight: 40,
          paddingInline: 17,
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#0E66AD',
            boxShadow: '0 3px 8px rgba(22,119,200,.22)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colores.borde,
          },
          '&.Mui-focused': {
            boxShadow: '0 0 0 3px rgba(22,119,200,.1)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
          },
        },
        input: {
          '&::placeholder': {
            color: '#98A1AD',
            opacity: 1,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

export default theme;
