import Box from '@mui/material/Box';

/**
 * Escudo institucional del CEMG Técnico "Dr. Jorge Fidel Durón".
 * - large: versión grande para espacios destacados.
 * - mono: versión monocromática para documentos impresos.
 */
export default function Logo({ large = false, mono = false, sx }) {
  const size = large ? 108 : 64;
  const azul = mono ? '#FFFFFF' : '#0D4F8B';
  const linea = mono ? '#111111' : '#F5B400';
  const trazo = mono ? '#111111' : '#0D4F8B';

  return (
    <Box
      aria-label="Escudo institucional"
      sx={{ width: size, height: size, flex: '0 0 auto', color: mono ? '#111111' : 'secondary.main', ...sx }}
    >
      <svg viewBox="0 0 100 100" role="img" width="100%" height="100%">
        <path
          d="M43 4h14l3 10a37 37 0 0 1 7 3l9-5 10 10-5 9a37 37 0 0 1 3 7l10 3v14l-10 3a37 37 0 0 1-3 7l5 9-10 10-9-5a37 37 0 0 1-7 3l-3 10H43l-3-10a37 37 0 0 1-7-3l-9 5-10-10 5-9a37 37 0 0 1-3-7L6 55V41l10-3a37 37 0 0 1 3-7l-5-9 10-10 9 5a37 37 0 0 1 7-3Z"
          fill="currentColor"
        />
        <circle cx="50" cy="48" r="31" fill={azul} />
        <circle cx="50" cy="48" r="24" fill="none" stroke={linea} strokeWidth="3" />
        <path d="M34 58V39l16-9 16 9v19l-16 9Z" fill="#FFFFFF" stroke={linea} strokeWidth="2" />
        <path d="M39 43h22M42 43v13m8-13v13m8-13v13M38 57h24" stroke={trazo} strokeWidth="3" />
        <path d="M29 75h42" stroke={linea} strokeWidth="4" />
      </svg>
    </Box>
  );
}
