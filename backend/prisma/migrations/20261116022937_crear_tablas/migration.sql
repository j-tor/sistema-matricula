-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "matricula";

-- CreateEnum
CREATE TYPE "auth"."rol_usuario" AS ENUM ('MATRICULADOR', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "matricula"."nivel_educativo" AS ENUM ('BASICA', 'MEDIA');

-- CreateEnum
CREATE TYPE "matricula"."estado_matricula" AS ENUM ('VIGENTE', 'ANULADA', 'RETIRADA');

-- CreateEnum
CREATE TYPE "matricula"."tipo_responsable" AS ENUM ('PADRE', 'MADRE', 'TUTOR', 'OTRO');

-- CreateTable
CREATE TABLE "auth"."usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre_completo" VARCHAR(100) NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "rol" "auth"."rol_usuario" NOT NULL DEFAULT 'MATRICULADOR',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "ultimo_acceso" TIMESTAMPTZ(6),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "matricula"."curso" (
    "id_curso" SERIAL NOT NULL,
    "codigo" VARCHAR(5) NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,
    "nivel" "matricula"."nivel_educativo" NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id_curso")
);

-- CreateTable
CREATE TABLE "matricula"."bachillerato" (
    "id_bachillerato" SERIAL NOT NULL,
    "nombre" VARCHAR(60) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "bachillerato_pkey" PRIMARY KEY ("id_bachillerato")
);

-- CreateTable
CREATE TABLE "matricula"."seccion" (
    "id_seccion" SERIAL NOT NULL,
    "anio" SMALLINT NOT NULL,
    "id_curso" INTEGER NOT NULL,
    "numero" SMALLINT NOT NULL,
    "id_bachillerato" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "seccion_pkey" PRIMARY KEY ("id_seccion")
);

-- CreateTable
CREATE TABLE "matricula"."alumno" (
    "id_alumno" SERIAL NOT NULL,
    "identidad" VARCHAR(20) NOT NULL,
    "nombre_completo" VARCHAR(100) NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "telefono" VARCHAR(20),
    "correo" VARCHAR(100),
    "direccion" VARCHAR(200),
    "emergencia_nombre" VARCHAR(100),
    "emergencia_direccion" VARCHAR(200),
    "emergencia_telefono" VARCHAR(20),
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "alumno_pkey" PRIMARY KEY ("id_alumno")
);

-- CreateTable
CREATE TABLE "matricula"."responsable" (
    "id_responsable" SERIAL NOT NULL,
    "identidad" VARCHAR(20),
    "nombre_completo" VARCHAR(100) NOT NULL,
    "telefono_fijo" VARCHAR(20),
    "celular" VARCHAR(20),
    "correo" VARCHAR(100),
    "lugar_nacimiento" VARCHAR(100),
    "fecha_nacimiento" DATE,
    "ocupacion" VARCHAR(60),
    "direccion" VARCHAR(200),
    "departamento" VARCHAR(50),
    "municipio" VARCHAR(60),
    "aldea_colonia" VARCHAR(100),
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "responsable_pkey" PRIMARY KEY ("id_responsable")
);

-- CreateTable
CREATE TABLE "matricula"."alumno_responsable" (
    "id_alumno" INTEGER NOT NULL,
    "id_responsable" INTEGER NOT NULL,
    "parentesco" "matricula"."tipo_responsable" NOT NULL,

    CONSTRAINT "alumno_responsable_pkey" PRIMARY KEY ("id_alumno","id_responsable")
);

-- CreateTable
CREATE TABLE "matricula"."matricula" (
    "id_matricula" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "id_seccion" INTEGER NOT NULL,
    "anio" SMALLINT NOT NULL,
    "area" VARCHAR(40),
    "jornada" VARCHAR(20),
    "materia_retrasada" VARCHAR(100),
    "fecha_matricula" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "matricula"."estado_matricula" NOT NULL DEFAULT 'VIGENTE',
    "registrado_por" INTEGER NOT NULL,
    "motivo_baja" VARCHAR(200),
    "baja_por" INTEGER,
    "fecha_baja" TIMESTAMPTZ(6),

    CONSTRAINT "matricula_pkey" PRIMARY KEY ("id_matricula")
);

-- CreateTable
CREATE TABLE "matricula"."salud_matricula" (
    "id_matricula" INTEGER NOT NULL,
    "padece_enfermedad" BOOLEAN NOT NULL DEFAULT false,
    "enfermedad_detalle" VARCHAR(200),
    "toma_medicamento" BOOLEAN NOT NULL DEFAULT false,
    "medicamento_detalle" VARCHAR(200),
    "tiene_problema_fisico" BOOLEAN NOT NULL DEFAULT false,
    "problema_fisico_detalle" VARCHAR(200),

    CONSTRAINT "salud_matricula_pkey" PRIMARY KEY ("id_matricula")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "auth"."usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "curso_codigo_key" ON "matricula"."curso"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "bachillerato_nombre_key" ON "matricula"."bachillerato"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "uq_seccion_anio_curso_numero_bach" ON "matricula"."seccion"("anio", "id_curso", "numero", "id_bachillerato");

-- CreateIndex
CREATE UNIQUE INDEX "alumno_identidad_key" ON "matricula"."alumno"("identidad");

-- CreateIndex
CREATE UNIQUE INDEX "responsable_identidad_key" ON "matricula"."responsable"("identidad");

-- AddForeignKey
ALTER TABLE "matricula"."seccion" ADD CONSTRAINT "seccion_id_curso_fkey" FOREIGN KEY ("id_curso") REFERENCES "matricula"."curso"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula"."seccion" ADD CONSTRAINT "seccion_id_bachillerato_fkey" FOREIGN KEY ("id_bachillerato") REFERENCES "matricula"."bachillerato"("id_bachillerato") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula"."alumno_responsable" ADD CONSTRAINT "alumno_responsable_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "matricula"."alumno"("id_alumno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula"."alumno_responsable" ADD CONSTRAINT "alumno_responsable_id_responsable_fkey" FOREIGN KEY ("id_responsable") REFERENCES "matricula"."responsable"("id_responsable") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula"."matricula" ADD CONSTRAINT "matricula_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "matricula"."alumno"("id_alumno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula"."matricula" ADD CONSTRAINT "matricula_id_seccion_fkey" FOREIGN KEY ("id_seccion") REFERENCES "matricula"."seccion"("id_seccion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula"."matricula" ADD CONSTRAINT "matricula_registrado_por_fkey" FOREIGN KEY ("registrado_por") REFERENCES "auth"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula"."matricula" ADD CONSTRAINT "matricula_baja_por_fkey" FOREIGN KEY ("baja_por") REFERENCES "auth"."usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matricula"."salud_matricula" ADD CONSTRAINT "salud_matricula_id_matricula_fkey" FOREIGN KEY ("id_matricula") REFERENCES "matricula"."matricula"("id_matricula") ON DELETE RESTRICT ON UPDATE CASCADE;
