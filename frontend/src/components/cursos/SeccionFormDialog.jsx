import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Campo from '../ui/Campo';

const vacio = { idCurso: '', numero: '', anio: '', idBachillerato: '' };

/**
 * Formulario para crear o editar una sección.
 * - cursos: lista de cursos para elegir a cuál pertenece la sección.
 * - bachilleratos: [{ idBachillerato, nombre }], solo aplica a cursos de nivel MEDIA.
 * - seccion: si viene, se abre en modo edición.
 */
export default function SeccionFormDialog({
  abierto,
  cursos = [],
  bachilleratos = [],
  cursoInicial,
  seccion,
  onCerrar,
  onGuardar,
}) {
  const [form, setForm] = useState(vacio);
  const editando = Boolean(seccion);
  const cursoElegido = cursos.find((curso) => curso.idCurso === form.idCurso);
  const esBachillerato = cursoElegido?.nivel === 'MEDIA';

  const cambiar = (campo) => (event) => setForm((actual) => ({ ...actual, [campo]: event.target.value }));

  const iniciar = () =>
    setForm({
      ...vacio,
      idCurso: cursoInicial?.idCurso ?? '',
      ...(seccion ?? {}),
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    onGuardar(form);
  };

  return (
    <Dialog open={abierto} onClose={onCerrar} fullWidth maxWidth="xs" slotProps={{ transition: { onEnter: iniciar } }}>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle sx={{ color: 'primary.dark', fontWeight: 700 }}>
          {editando ? 'Editar sección' : 'Crear sección'}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '8px !important' }}>
          <Campo label="Curso" select required value={form.idCurso} onChange={cambiar('idCurso')} disabled={editando}>
            {cursos.length === 0 && (
              <MenuItem value="" disabled>
                No hay cursos registrados
              </MenuItem>
            )}
            {cursos.map((curso) => (
              <MenuItem key={curso.idCurso} value={curso.idCurso}>
                {curso.codigo}
              </MenuItem>
            ))}
          </Campo>
          <Campo
            label="Número de sección"
            type="number"
            placeholder="Ej. 1"
            required
            value={form.numero}
            onChange={cambiar('numero')}
            slotProps={{ htmlInput: { min: 1 } }}
          />
          <Campo
            label="Año lectivo"
            type="number"
            placeholder="Ej. 2025"
            required
            value={form.anio}
            onChange={cambiar('anio')}
          />
          <Campo
            label="Bachillerato"
            select
            value={form.idBachillerato}
            onChange={cambiar('idBachillerato')}
            disabled={!esBachillerato}
            ayuda="Se habilita únicamente para cursos de bachillerato (10mo a 12vo)."
          >
            <MenuItem value="">Ninguno</MenuItem>
            {bachilleratos.map((bachillerato) => (
              <MenuItem key={bachillerato.idBachillerato} value={bachillerato.idBachillerato}>
                {bachillerato.nombre}
              </MenuItem>
            ))}
          </Campo>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button variant="outlined" onClick={onCerrar}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            {editando ? 'Guardar cambios' : 'Crear sección'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
