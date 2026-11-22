import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const claveSesion = 'matricula.sesion';
export const eventoSesionTerminada = 'matricula:sesion-terminada';

export function leerSesion() {
  const valor = sessionStorage.getItem(claveSesion);
  if (!valor) return null;
  try {
    const sesion = JSON.parse(valor);
    return typeof sesion?.token === 'string' && Number.isFinite(Date.parse(sesion.expiraEn))
      ? sesion
      : null;
  } catch {
    return null;
  }
}

export function guardarSesion({ token, expiraEn }) {
  sessionStorage.setItem(claveSesion, JSON.stringify({ token, expiraEn }));
}

export function terminarSesion() {
  sessionStorage.removeItem(claveSesion);
  window.dispatchEvent(new Event(eventoSesionTerminada));
}

api.interceptors.request.use((config) => {
  const sesion = leerSesion();
  if (sesion && config.url !== '/autenticacion/login') {
    config.headers.set('Authorization', `Bearer ${sesion.token}`);
  }
  return config;
});

api.interceptors.response.use((respuesta) => respuesta, (error) => {
  const sesion = leerSesion();
  if (error.response?.status === 401 && sesion &&
      error.config?.headers?.get('Authorization') === `Bearer ${sesion.token}`) {
    terminarSesion();
  }
  return Promise.reject(error);
});

export default api;

