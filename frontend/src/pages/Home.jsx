import { Link, useOutletContext } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PageIntro from '../components/layout/PageIntro';
import StatCard from '../components/inicio/StatCard';
import GraficoPorCurso from '../components/inicio/GraficoPorCurso';
import PorMatriculador from '../components/inicio/PorMatriculador';
import ResumenPorSeccion from '../components/inicio/ResumenPorSeccion';
// DATOS DE EJEMPLO: reemplazar por la información del backend
import resumen from '../mocks/inicio';

const saludo = () => {
  const hora = new Date().getHours();
  if (hora < 12) return 'Buenos días';
  if (hora < 18) return 'Buenas tardes';
  return 'Buenas noches';
};

function Home() {
  const { totales } = resumen;
  const { usuario } = useOutletContext();
  const nombre = usuario.nombreCompleto.split(' ')[0];

  return (
    <>
      <PageIntro
        antetitulo={`RESUMEN DEL AÑO LECTIVO ${resumen.anio}`}
        titulo={`${saludo()}, ${nombre}`}
        descripcion="Consulte el estado actual de las matrículas del centro educativo."
        acciones={
          <Button component={Link} to="/nueva-matricula" variant="contained" startIcon={<NoteAddOutlinedIcon />}>
            Registrar nueva matrícula
          </Button>
        }
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2, mb: 2.25 }}>
        <StatCard
          icono={PeopleOutlinedIcon}
          color="azul"
          titulo="Total de matriculados"
          valor={totales.matriculados}
          detalle={
            <>
              <b>+{totales.nuevosSemana}</b> esta semana
            </>
          }
        />
        <StatCard
          icono={MenuBookOutlinedIcon}
          color="dorado"
          titulo="Por curso"
          valor={totales.promedioPorCurso}
          detalle="Promedio por curso"
        />
        <StatCard
          icono={DescriptionOutlinedIcon}
          color="marino"
          titulo="Por bachillerato"
          valor={totales.bachillerato}
          detalle="10mo a 12vo"
        />
        <StatCard
          icono={PersonOutlinedIcon}
          color="verde"
          titulo="Mis matrículas"
          valor={totales.misMatriculas}
          detalle={`${totales.porcentajeMias}% del total`}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.65fr 1fr' }, gap: 2.25, mb: 2.25 }}>
        <GraficoPorCurso datos={resumen.porCurso} />
        <PorMatriculador matriculadores={resumen.porMatriculador} hoy={resumen.hoy} />
      </Box>

      <ResumenPorSeccion secciones={resumen.porSeccion} anio={resumen.anio} />
    </>
  );
}

export default Home;
