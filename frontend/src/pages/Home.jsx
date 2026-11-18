import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Logo from '../components/ui/Logo';
import CerrarSesionButton from '../components/ui/CerrarSesionButton';

// Pantalla temporal: el menú principal y el resumen se agregan en #26
function Home() {
  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Logo large />
        </Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.dark' }}>
          Sistema de Matrícula
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Bienvenido al sistema de matrícula del CEMG Técnico “Dr. Jorge Fidel Durón”.
        </Typography>
        <CerrarSesionButton variant="outlined" />
      </Paper>
    </Container>
  );
}

export default Home;
