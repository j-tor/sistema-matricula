import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import PageIntro from '../components/layout/PageIntro';

// El resumen del año lectivo (tarjetas y gráficos) se agrega en su propia tarea
function Home() {
  return (
    <PageIntro
      antetitulo="RESUMEN DEL AÑO LECTIVO"
      titulo="Bienvenido"
      descripcion="Consulte el estado actual de las matrículas del centro educativo."
      acciones={
        <Button component={Link} to="/nueva-matricula" variant="contained" startIcon={<NoteAddOutlinedIcon />}>
          Registrar nueva matrícula
        </Button>
      }
    />
  );
}

export default Home;
