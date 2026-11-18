import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Campo from '../ui/Campo';
import { NIVELES } from './niveles';

const vacio = { codigo: '', nombre: '', nivel: '' };

/**
 * Formulario para crear o editar un curso.
 * Si recibe `curso` se abre en modo edición con sus datos.
 */
export default function CursoFormDialog({ abierto, curso, onCerrar, onGuardar }) {
  const [form, setForm] = useState(vacio);
  const editando = Boolean(curso);

  const cambiar = (campo) => (event) => setForm((actual) => ({ ...actual, [campo]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    onGuardar(form);
  };

  return (
    <Dialog
      open={abierto}
      onClose={onCerrar}
      fullWidth
      maxWidth="xs"
      slotProps={{ transition: { onEnter: () => setForm(curso ? { ...vacio, ...curso } : vacio) } }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle sx={{ color: 'primary.dark', fontWeight: 700 }}>
          {editando ? 'Editar curso' : 'Crear curso'}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '8px !important' }}>
          <Campo label="Código" placeholder="Ej. 7mo" required value={form.codigo} onChange={cambiar('codigo')} />
          <Campo label="Nombre" placeholder="Ej. Séptimo grado" required value={form.nombre} onChange={cambiar('nombre')} />
          <Campo label="Nivel" select required value={form.nivel} onChange={cambiar('nivel')}>
            {Object.entries(NIVELES).map(([valor, etiqueta]) => (
              <MenuItem key={valor} value={valor}>
                {etiqueta}
              </MenuItem>
            ))}
          </Campo>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button variant="outlined" onClick={onCerrar}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            {editando ? 'Guardar cambios' : 'Crear curso'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
