CREATE TABLE auth.auditoria_cambio (
    id BIGSERIAL PRIMARY KEY,
    tabla TEXT NOT NULL,
    registro JSONB NOT NULL,
    registro_anterior JSONB,
    operacion TEXT NOT NULL CHECK (operacion IN ('INSERT', 'UPDATE', 'DELETE')),
    id_usuario INTEGER REFERENCES auth.usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    ocurrido_en TIMESTAMPTZ(6) NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX auditoria_cambio_tabla_registro_idx ON auth.auditoria_cambio (tabla, registro);

CREATE FUNCTION auth.registrar_cambio() RETURNS trigger
LANGUAGE plpgsql AS $$
DECLARE
    clave text;
    anterior jsonb := '{}'::jsonb;
    actual jsonb := '{}'::jsonb;
    actor integer := NULLIF(current_setting('matricula.actor_id', true), '')::integer;
BEGIN
    IF TG_OP = 'UPDATE' AND OLD IS NOT DISTINCT FROM NEW THEN
        RETURN NULL;
    END IF;

    FOREACH clave IN ARRAY TG_ARGV LOOP
        IF TG_OP <> 'INSERT' THEN
            anterior := anterior || jsonb_build_object(clave, to_jsonb(OLD)->clave);
        END IF;
        IF TG_OP <> 'DELETE' THEN
            actual := actual || jsonb_build_object(clave, to_jsonb(NEW)->clave);
        END IF;
    END LOOP;

    INSERT INTO auth.auditoria_cambio (tabla, registro, registro_anterior, operacion, id_usuario)
    VALUES (
        TG_TABLE_NAME,
        CASE WHEN TG_OP = 'DELETE' THEN anterior ELSE actual END,
        CASE WHEN TG_OP = 'UPDATE' AND anterior <> actual THEN anterior END,
        TG_OP,
        actor
    );
    RETURN NULL;
END;
$$;

CREATE TRIGGER auditar_cambio AFTER INSERT OR UPDATE OR DELETE ON matricula.anio_lectivo
FOR EACH ROW EXECUTE FUNCTION auth.registrar_cambio('anio');

CREATE TRIGGER auditar_cambio AFTER INSERT OR UPDATE OR DELETE ON matricula.curso
FOR EACH ROW EXECUTE FUNCTION auth.registrar_cambio('id_curso');

CREATE TRIGGER auditar_cambio AFTER INSERT OR UPDATE OR DELETE ON matricula.bachillerato
FOR EACH ROW EXECUTE FUNCTION auth.registrar_cambio('id_bachillerato');

CREATE TRIGGER auditar_cambio AFTER INSERT OR UPDATE OR DELETE ON matricula.seccion
FOR EACH ROW EXECUTE FUNCTION auth.registrar_cambio('id_seccion');

CREATE TRIGGER auditar_cambio AFTER INSERT OR UPDATE OR DELETE ON matricula.alumno
FOR EACH ROW EXECUTE FUNCTION auth.registrar_cambio('id_alumno');

CREATE TRIGGER auditar_cambio AFTER INSERT OR UPDATE OR DELETE ON matricula.responsable
FOR EACH ROW EXECUTE FUNCTION auth.registrar_cambio('id_responsable');

CREATE TRIGGER auditar_cambio AFTER INSERT OR UPDATE OR DELETE ON matricula.alumno_responsable
FOR EACH ROW EXECUTE FUNCTION auth.registrar_cambio('id_alumno', 'id_responsable');

CREATE TRIGGER auditar_cambio AFTER INSERT OR UPDATE OR DELETE ON matricula.matricula
FOR EACH ROW EXECUTE FUNCTION auth.registrar_cambio('id_matricula');

CREATE TRIGGER auditar_cambio AFTER INSERT OR UPDATE OR DELETE ON matricula.salud_matricula
FOR EACH ROW EXECUTE FUNCTION auth.registrar_cambio('id_matricula');
