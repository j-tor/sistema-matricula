import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Logo from '../components/ui/Logo';

// Etiqueta visible arriba del campo, como en el diseño
function Campo({ label, ...props }) {
  return (
    <Box component="label" sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 2 }}>
      <Typography component="span" sx={{ fontSize: 13, fontWeight: 600 }}>
        {label}
        <Box component="b" sx={{ color: 'error.main' }}>
          {' '}
          *
        </Box>
      </Typography>
      <TextField size="small" fullWidth {...props} />
    </Box>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(false);

  // Solo visual: la autenticación real se conectará cuando exista el endpoint
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!usuario.trim() || !contrasena.trim()) {
      setError(true);
      return;
    }
    setError(false);
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        p: { xs: 2, sm: 6 },
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          px: { xs: 3, sm: 4.75 },
          pt: 4.25,
          pb: 3.5,
          border: '1px solid #E1E6EB',
          boxShadow: '0 10px 35px rgba(13,79,139,.07)',
        }}
      >
        {/* Identidad institucional */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.75,
            pb: 3,
            mb: 3.5,
            borderBottom: '1px solid #EDF0F3',
          }}
        >
          <Logo />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.375 }}>
            <Typography sx={{ color: 'primary.main', fontSize: 13, fontWeight: 700, letterSpacing: '.08em' }}>
              CEMG TÉCNICO
            </Typography>
            <Typography sx={{ color: 'primary.dark', fontSize: 17, fontWeight: 700, lineHeight: 1.25 }}>
              “Dr. Jorge Fidel Durón”
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 11 }}>San Francisco de Yojoa, Cortés</Typography>
          </Box>
        </Box>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Typography sx={{ color: 'primary.main', fontWeight: 700, fontSize: 11, letterSpacing: '.09em' }}>
            SISTEMA DE MATRÍCULA ESTUDIANTIL
          </Typography>
          <Typography component="h2" sx={{ color: 'primary.dark', fontSize: 25, fontWeight: 700, mt: 1, mb: 0.75 }}>
            Iniciar sesión
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 13, mb: 3 }}>
            Ingrese sus credenciales para continuar.
          </Typography>

          {error && (
            <Alert severity="error" variant="outlined" sx={{ mb: 2, bgcolor: '#FFF0F0', borderColor: '#EFC0C0' }}>
              Usuario o contraseña incorrectos. Verifique sus datos e intente de nuevo.
            </Alert>
          )}

          <Campo
            label="Usuario"
            placeholder="Escriba su usuario"
            name="username"
            autoComplete="username"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            error={error && !usuario.trim()}
          />
          <Campo
            label="Contraseña"
            placeholder="Escriba su contraseña"
            type="password"
            name="password"
            autoComplete="current-password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            error={error && !contrasena.trim()}
          />

          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Recordar usuario"
            sx={{ mt: 0.25, mb: 2.5, '& .MuiFormControlLabel-label': { fontSize: 12, color: 'text.secondary' } }}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ height: 45 }}>
            Ingresar
          </Button>
        </Box>

        <Box
          sx={{
            mt: 3.25,
            pt: 2.25,
            borderTop: '1px solid #EDF0F3',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            color: 'text.secondary',
          }}
        >
          <Typography sx={{ fontSize: 11, fontWeight: 600 }}>Acceso exclusivo para personal autorizado</Typography>
          <Typography sx={{ fontSize: 10 }}>Centro educativo gubernamental</Typography>
        </Box>
      </Paper>
    </Box>
  );
}
