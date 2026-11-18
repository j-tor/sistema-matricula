import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NuevaMatricula from "./pages/NuevaMatricula";
import BuscarMatriculas from "./pages/BuscarMatriculas";
import CursosSecciones from "./pages/CursosSecciones";
import Reportes from "./pages/Reportes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Pantallas con el menú principal */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nueva-matricula" element={<NuevaMatricula />} />
          <Route path="/buscar-matriculas" element={<BuscarMatriculas />} />
          <Route path="/cursos-secciones" element={<CursosSecciones />} />
          <Route path="/reportes" element={<Reportes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
