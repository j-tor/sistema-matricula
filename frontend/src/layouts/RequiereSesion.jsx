import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import api, { eventoSesionTerminada, leerSesion, terminarSesion } from '../services/api';

export default function RequiereSesion() {
  const ubicacion = useLocation();
  const [sesion, setSesion] = useState(leerSesion);
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(false);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    if (!sesion) return;
    const controller = new AbortController();
    const cerrar = () => setSesion(null);
    const restante = Date.parse(sesion.expiraEn) - Date.now();
    window.addEventListener(eventoSesionTerminada, cerrar);
    const expiracion = window.setTimeout(terminarSesion, restante);

    api.get('/autenticacion/sesion', { signal: controller.signal })
      .then(({ data }) => {
        if (!controller.signal.aborted) {
          setUsuario(data);
          setError(false);
        }
      })
      .catch((causa) => {
        if (!controller.signal.aborted && causa.response?.status !== 401) setError(true);
      });

    return () => {
      controller.abort();
      window.clearTimeout(expiracion);
      window.removeEventListener(eventoSesionTerminada, cerrar);
    };
  }, [sesion, intento, ubicacion.pathname]);

  if (!sesion) return <Navigate to="/login" replace state={{ destino: ubicacion }} />;
  if (error) {
    return (
      <Alert severity="error" action={<Button onClick={() => setIntento(intento + 1)}>Reintentar</Button>}>
        No se pudo verificar la sesión.
      </Alert>
    );
  }
  if (!usuario) return <p role="status">Verificando sesión…</p>;
  return <Outlet context={usuario} />;
}
