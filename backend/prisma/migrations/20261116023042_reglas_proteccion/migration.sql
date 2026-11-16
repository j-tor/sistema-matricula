DROP INDEX "matricula"."uq_seccion_anio_curso_numero_bach";
CREATE UNIQUE INDEX "uq_seccion_anio_curso_numero_bach"
  ON "matricula"."seccion" ("anio", "id_curso", "numero", "id_bachillerato")
  NULLS NOT DISTINCT;

CREATE UNIQUE INDEX "uq_matricula_vigente"
  ON "matricula"."matricula" ("id_alumno", "anio")
  WHERE "estado" = 'VIGENTE';
