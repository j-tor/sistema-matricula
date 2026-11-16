import "dotenv/config";
import { PrismaClient, NivelEducativo, RolUsuario } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Cursos
  const cursos = [
    { codigo: "7mo", nombre: "Séptimo", nivel: NivelEducativo.BASICA },
    { codigo: "8vo", nombre: "Octavo", nivel: NivelEducativo.BASICA },
    { codigo: "9no", nombre: "Noveno", nivel: NivelEducativo.BASICA },
    { codigo: "10mo", nombre: "Décimo", nivel: NivelEducativo.MEDIA },
    { codigo: "11vo", nombre: "Undécimo", nivel: NivelEducativo.MEDIA },
    { codigo: "12vo", nombre: "Duodécimo", nivel: NivelEducativo.MEDIA },
  ];

  for (const curso of cursos) {
    await prisma.curso.upsert({
      where: { codigo: curso.codigo },
      update: {
        nombre: curso.nombre,
        nivel: curso.nivel,
        activo: true,
      },
      create: curso,
    });
  }

  // 2. Bachilleratos
  const bachilleratos = [
    "Informática",
    "Innovación y Desarrollo Agropecuario",
    "Electromecánica",
  ];

  for (const nombre of bachilleratos) {
    await prisma.bachillerato.upsert({
      where: { nombre },
      update: { activo: true },
      create: { nombre },
    });
  }

  // 3. Usuarios matriculadores
  const usuarios = [
    {
      nombreCompleto: process.env.SEED_USER_1_NAME,
      username: process.env.SEED_USER_1_USERNAME,
      password: process.env.SEED_USER_1_PASSWORD,
    },
    {
      nombreCompleto: process.env.SEED_USER_2_NAME,
      username: process.env.SEED_USER_2_USERNAME,
      password: process.env.SEED_USER_2_PASSWORD,
    },
  ];

  for (const usuario of usuarios) {
    if (!usuario.nombreCompleto || !usuario.username || !usuario.password) {
      throw new Error("Faltan datos de los usuarios en backend/.env");
    }

    const passwordHash = await hash(usuario.password, 12);

    await prisma.usuario.upsert({
      where: { username: usuario.username },
      update: {
        nombreCompleto: usuario.nombreCompleto,
        rol: RolUsuario.MATRICULADOR,
        activo: true,
      },
      create: {
        nombreCompleto: usuario.nombreCompleto,
        username: usuario.username,
        passwordHash,
        rol: RolUsuario.MATRICULADOR,
        activo: true,
      },
    });
  }

  console.log("Datos iniciales cargados correctamente.");
}

main()
  .catch((error) => {
    console.error("Error al cargar los datos iniciales:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
