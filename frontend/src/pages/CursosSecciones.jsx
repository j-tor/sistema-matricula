import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import PageIntro from '../components/layout/PageIntro';
import AvisoImportante from '../components/ui/AvisoImportante';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import CursoCard from '../components/cursos/CursoCard';
import CursoFormDialog from '../components/cursos/CursoFormDialog';
import SeccionFormDialog from '../components/cursos/SeccionFormDialog';
import { nombreSeccion, totalEstudiantes } from '../components/cursos/niveles';
// DATOS DE EJEMPLO: reemplazar por los cursos y bachilleratos del backend
import { cursosEjemplo, bachilleratosEjemplo } from '../mocks/cursos';

const sinConfirmacion = { abierto: false };

export default function CursosSecciones() {
  const [cursos] = useState(cursosEjemplo);
  const [bachilleratos] = useState(bachilleratosEjemplo);

  const [cursoDialog, setCursoDialog] = useState({ abierto: false, curso: null });
  const [seccionDialog, setSeccionDialog] = useState({ abierto: false, curso: null, seccion: null });
  const [confirmacion, setConfirmacion] = useState(sinConfirmacion);

  const cerrarConfirmacion = () => setConfirmacion(sinConfirmacion);

  const eliminarCurso = (curso) => {
    if (totalEstudiantes(curso) > 0 || (curso.secciones ?? []).length > 0) {
      setConfirmacion({
        abierto: true,
        soloAviso: true,
        titulo: `No se puede eliminar el curso ${curso.codigo}`,
        mensaje:
          'El curso tiene secciones con estudiantes matriculados. Elimine o desactive primero sus secciones.',
      });
      return;
    }
    setConfirmacion({
      abierto: true,
      titulo: `¿Desea eliminar el curso ${curso.codigo}?`,
      mensaje: 'Esta acción no se puede deshacer.',
      textoConfirmar: 'Eliminar',
    });
  };

  const eliminarSeccion = (curso, seccion) => {
    const nombre = nombreSeccion(curso, seccion);
    if ((seccion.totalEstudiantes ?? 0) > 0) {
      setConfirmacion({
        abierto: true,
        soloAviso: true,
        titulo: `No se puede eliminar la sección ${nombre}`,
        mensaje: `La sección tiene ${seccion.totalEstudiantes} estudiantes matriculados. Puede desactivarla para próximos años.`,
      });
      return;
    }
    setConfirmacion({
      abierto: true,
      titulo: `¿Desea eliminar la sección ${nombre}?`,
      mensaje: 'Esta acción no se puede deshacer.',
      textoConfirmar: 'Eliminar',
    });
  };

  return (
    <>
      <PageIntro
        titulo="Cursos y secciones"
        descripcion="Administre la estructura académica del centro educativo."
        acciones={
          <>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setCursoDialog({ abierto: true, curso: null })}>
              Crear curso
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setSeccionDialog({ abierto: true, curso: null, seccion: null })}
            >
              Crear sección
            </Button>
          </>
        }
      />

      <AvisoImportante>
        Una sección con estudiantes matriculados no puede eliminarse definitivamente. Puede desactivarla para próximos
        años.
      </AvisoImportante>

      {cursos.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            py: 7,
            px: 3,
            textAlign: 'center',
            border: '1px dashed',
            borderColor: 'divider',
            color: 'text.secondary',
          }}
        >
          <MenuBookOutlinedIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography sx={{ fontWeight: 700, color: 'primary.dark' }}>No hay cursos registrados</Typography>
          <Typography sx={{ fontSize: 13, mt: 0.5 }}>Use “Crear curso” para agregar el primero.</Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 2 }}>
          {cursos.map((curso) => (
            <CursoCard
              key={curso.idCurso}
              curso={curso}
              onEditar={(c) => setCursoDialog({ abierto: true, curso: c })}
              onEliminar={eliminarCurso}
              onAgregarSeccion={(c) => setSeccionDialog({ abierto: true, curso: c, seccion: null })}
              onEditarSeccion={(c, s) => setSeccionDialog({ abierto: true, curso: c, seccion: { ...s, idCurso: c.idCurso } })}
              onEliminarSeccion={eliminarSeccion}
            />
          ))}
        </Box>
      )}

      <CursoFormDialog
        abierto={cursoDialog.abierto}
        curso={cursoDialog.curso}
        onCerrar={() => setCursoDialog({ abierto: false, curso: null })}
        onGuardar={() => setCursoDialog({ abierto: false, curso: null })}
      />

      <SeccionFormDialog
        abierto={seccionDialog.abierto}
        cursos={cursos}
        bachilleratos={bachilleratos}
        cursoInicial={seccionDialog.curso}
        seccion={seccionDialog.seccion}
        onCerrar={() => setSeccionDialog({ abierto: false, curso: null, seccion: null })}
        onGuardar={() => setSeccionDialog({ abierto: false, curso: null, seccion: null })}
      />

      <ConfirmDialog
        abierto={confirmacion.abierto}
        titulo={confirmacion.titulo}
        mensaje={confirmacion.mensaje}
        textoConfirmar={confirmacion.textoConfirmar}
        soloAviso={confirmacion.soloAviso}
        onCancelar={cerrarConfirmacion}
        onConfirmar={cerrarConfirmacion}
      />
    </>
  );
}
