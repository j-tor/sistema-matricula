import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tarjeta, { TarjetaEncabezado } from '../ui/Tarjeta';

const ALTURA_MAXIMA = 185; // px de la barra más alta posible
const ESCALA = [100, 75, 50, 25, 0];

// Gráfico de barras: estudiantes matriculados por curso
export default function GraficoPorCurso({ datos = [] }) {
  const maximo = Math.max(ESCALA[0], ...datos.map((d) => d.estudiantes));

  return (
    <Tarjeta sx={{ minHeight: 325 }}>
      <TarjetaEncabezado
        titulo="Estudiantes por curso"
        descripcion="Distribución de matrículas vigentes"
        extra={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'text.secondary', fontSize: 11 }}>
            <Box component="i" sx={{ width: 8, height: 8, borderRadius: '2px', bgcolor: 'primary.main' }} />
            Estudiantes
          </Box>
        }
      />
      <Box sx={{ height: 235, display: 'flex' }}>
        <Box
          sx={{
            width: 35,
            pb: '25px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: '#8A95A3',
            fontSize: 10,
          }}
        >
          {ESCALA.map((valor) => (
            <span key={valor}>{valor}</span>
          ))}
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'flex-end',
              borderBottom: 1,
              borderColor: 'divider',
              background: 'repeating-linear-gradient(to bottom, #fff 0, #fff 51px, #edf0f4 52px)',
            }}
          >
            {datos.map(({ curso, estudiantes }) => (
              <Box key={curso} sx={{ width: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography sx={{ color: 'primary.dark', fontWeight: 700, fontSize: 11, mb: 0.625 }}>{estudiantes}</Typography>
                <Box
                  sx={{
                    width: 28,
                    height: (estudiantes / maximo) * ALTURA_MAXIMA,
                    background: 'linear-gradient(#2789D6, #1677C8)',
                    borderRadius: '5px 5px 0 0',
                  }}
                />
              </Box>
            ))}
          </Box>
          <Box sx={{ height: 25, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            {datos.map(({ curso }) => (
              <Typography key={curso} sx={{ width: 50, textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'text.secondary' }}>
                {curso}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Tarjeta>
  );
}
