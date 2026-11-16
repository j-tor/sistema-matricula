-- Bloquea los años lectivos futuros directamente en la base de datos.
-- El año actual se calcula con la fecha del servidor en la zona horaria de Honduras,
-- por lo que la regla se actualiza sola cada año (no hay ningún año escrito fijo).

CREATE OR REPLACE FUNCTION "matricula"."fn_bloquear_anio_futuro"()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW."anio" > EXTRACT(YEAR FROM (now() AT TIME ZONE 'America/Tegucigalpa'))::int THEN
    RAISE EXCEPTION 'No se permiten años lectivos futuros'
      USING ERRCODE = 'check_violation',
            DETAIL = format('Año recibido: %s', NEW."anio");
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER "trg_seccion_bloquear_anio_futuro"
  BEFORE INSERT OR UPDATE OF "anio" ON "matricula"."seccion"
  FOR EACH ROW EXECUTE FUNCTION "matricula"."fn_bloquear_anio_futuro"();

CREATE TRIGGER "trg_matricula_bloquear_anio_futuro"
  BEFORE INSERT OR UPDATE OF "anio" ON "matricula"."matricula"
  FOR EACH ROW EXECUTE FUNCTION "matricula"."fn_bloquear_anio_futuro"();
