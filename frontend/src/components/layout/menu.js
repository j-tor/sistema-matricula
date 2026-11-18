import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';

// Opciones del menú principal: se usan en el menú lateral y para el título de la barra superior
const menu = [
  { label: 'Inicio', path: '/', icon: HomeOutlinedIcon },
  { label: 'Nueva matrícula', path: '/nueva-matricula', icon: NoteAddOutlinedIcon, atajo: true },
  { label: 'Buscar matrículas', path: '/buscar-matriculas', icon: SearchIcon },
  { label: 'Cursos y secciones', path: '/cursos-secciones', icon: MenuBookOutlinedIcon },
  { label: 'Reportes', path: '/reportes', icon: BarChartIcon },
];

export default menu;
