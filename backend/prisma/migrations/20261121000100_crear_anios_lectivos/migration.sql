CREATE TABLE "matricula"."anio_lectivo" (
    "anio" SMALLINT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "anio_lectivo_pkey" PRIMARY KEY ("anio")
);

CREATE TRIGGER "trg_anio_lectivo_bloquear_anio_futuro"
BEFORE INSERT OR UPDATE OF "anio"
ON "matricula"."anio_lectivo"
FOR EACH ROW
EXECUTE FUNCTION "matricula"."fn_bloquear_anio_futuro"();
