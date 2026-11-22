import { useEffect, useState } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Sidebar, { SIDEBAR_WIDTH } from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import menu from "../components/layout/menu";
import api from "../services/api";

export default function AppLayout() {
  const { pathname } = useLocation();
  const usuario = useOutletContext();
  const opcionActual = menu.find((opcion) => opcion.path === pathname);

  const [aniosLectivos, setAniosLectivos] = useState([]);
  const [anioLectivo, setAnioLectivo] = useState("");
  const [errorAnios, setErrorAnios] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarAnios() {
      try {
        const [respuestaActual, respuestaAnios] = await Promise.all([
          api.get("/anios-lectivos/actual", {
            signal: controller.signal,
          }),
          api.get("/anios-lectivos", {
            signal: controller.signal,
          }),
        ]);

        const { anioActual } = respuestaActual.data;
        const registros = respuestaAnios.data;

        if (!Number.isInteger(anioActual) || !Array.isArray(registros)) {
          throw new Error("Respuesta inválida del servidor");
        }

        const disponibles = [
          ...new Set([
            anioActual,
            ...registros
              .filter(
                (registro) =>
                  registro.activo === true &&
                  Number.isInteger(registro.anio) &&
                  registro.anio <= anioActual,
              )
              .map((registro) => registro.anio),
          ]),
        ].sort((a, b) => b - a);

        if (controller.signal.aborted) return;
        setAniosLectivos(disponibles);
        setAnioLectivo(anioActual);
        setErrorAnios("");
      } catch (error) {
        if (!controller.signal.aborted) {
          setErrorAnios("No se pudieron cargar los años lectivos.");
        }
      }
    }

    cargarAnios();
    return () => controller.abort();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          ml: `${SIDEBAR_WIDTH}px`,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        }}
      >
        <Topbar
          titulo={opcionActual?.label ?? ""}
          usuario={{ nombre: usuario.nombreCompleto, rol: usuario.rol === "SUPERADMIN" ? "Superadministrador" : "Matriculador" }}
          aniosLectivos={aniosLectivos}
          anioLectivo={anioLectivo}
          onAnioChange={setAnioLectivo}
        />

        <Box
          component="main"
          sx={{
            px: 4,
            pt: 3.5,
            pb: 6.25,
            maxWidth: 1600,
            mx: "auto",
          }}
        >
          {errorAnios && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorAnios}
            </Alert>
          )}
          <Outlet context={{ anioLectivo, usuario }} />
        </Box>
      </Box>
    </Box>
  );
}
