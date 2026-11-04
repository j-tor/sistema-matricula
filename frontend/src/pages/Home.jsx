import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import SchoolIcon from '@mui/icons-material/School';

function Home() {
  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={0} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
        <Box sx={{ color: 'primary.main', mb: 2 }}>
          <SchoolIcon sx={{ fontSize: 64 }} />
        </Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Sistema de Matrícula
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bienvenido. El frontend está funcionando correctamente con Material UI.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Home;

