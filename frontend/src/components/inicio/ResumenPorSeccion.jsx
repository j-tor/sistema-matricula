import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Tarjeta, { TarjetaEncabezado } from '../ui/Tarjeta';

// Cantidad de estudiantes con matrícula vigente en cada sección
export default function ResumenPorSeccion({ secciones = [], anio }) {
  return (
    <Tarjeta>
      <TarjetaEncabezado
        titulo="Resumen por sección"
        descripcion={`Matrículas vigentes del año lectivo ${anio ?? ''}`}
        extra={
          <Button component={Link} to="/reportes" endIcon={<ChevronRightIcon />} sx={{ minHeight: 'auto', p: 0 }}>
            Ver listado completo
          </Button>
        }
      />
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' }, gap: 1.25 }}>
        {secciones.map(({ seccion, estudiantes }) => (
          <Box key={seccion} sx={{ bgcolor: 'background.default', borderRadius: '7px', p: 1.5, display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ color: 'primary.main', fontSize: 12, fontWeight: 700 }}>{seccion}</Typography>
            <Typography sx={{ color: 'primary.dark', fontSize: 20, fontWeight: 700, my: 0.5 }}>{estudiantes}</Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 11 }}>estudiantes</Typography>
          </Box>
        ))}
      </Box>
    </Tarjeta>
  );
}
