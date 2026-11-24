require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Controller, Get, Module, BadRequestException } = require('@nestjs/common');
const { NestFactory } = require('@nestjs/core');
const { Prisma } = require('@prisma/client');
const { AppModule } = require('../dist/app.module');
const { DatabaseModule } = require('../dist/database/database.module');
const { PrismaService } = require('../dist/database/prisma.service');
const { AniosLectivosModule } = require('../dist/modules/anios-lectivos/anios-lectivos.module');
const { AnioLectivoPipe } = require('../dist/modules/anios-lectivos/anio-lectivo.pipe');
const {
  MENSAJE_ANIO_FUTURO,
  obtenerAnioActual,
  validarAnioLectivo,
} = require('../dist/modules/anios-lectivos/anio-lectivo.regla');

// Simula la conexión para que las pruebas no dependan de PostgreSQL.
PrismaService.prototype.$connect = async () => {};
PrismaService.prototype.$disconnect = async () => {};

const ANIO_ACTUAL = 2040;
const consultarAnio = async (consulta) => {
  assert.ok(consulta.join('').includes("now() AT TIME ZONE 'America/Tegucigalpa'"));
  return [{ anio: ANIO_ACTUAL }];
};

function esErrorAnioFuturo(error) {
  return error instanceof BadRequestException && error.message === MENSAJE_ANIO_FUTURO;
}

test('el año actual se consulta en PostgreSQL con la zona de Honduras', async () => {
  assert.equal(await obtenerAnioActual({ $queryRaw: consultarAnio }), ANIO_ACTUAL);
});

test('se aceptan el año actual y los anteriores', () => {
  assert.equal(validarAnioLectivo(ANIO_ACTUAL, ANIO_ACTUAL), ANIO_ACTUAL);
  assert.equal(validarAnioLectivo(ANIO_ACTUAL - 1, ANIO_ACTUAL), ANIO_ACTUAL - 1);
  assert.equal(validarAnioLectivo(2000, ANIO_ACTUAL), 2000);
});

test('se rechaza un año futuro con «No se permiten años lectivos futuros»', () => {
  assert.throws(() => validarAnioLectivo(ANIO_ACTUAL + 1, ANIO_ACTUAL), esErrorAnioFuturo);
  assert.throws(() => validarAnioLectivo(ANIO_ACTUAL + 10, ANIO_ACTUAL), esErrorAnioFuturo);
});

test('el pipe convierte el texto a número y aplica la regla', async () => {
  const pipe = new AnioLectivoPipe({ $queryRaw: consultarAnio });
  assert.equal(await pipe.transform(String(ANIO_ACTUAL)), ANIO_ACTUAL);
  assert.equal(await pipe.transform(ANIO_ACTUAL - 1), ANIO_ACTUAL - 1);
  await assert.rejects(() => pipe.transform(String(ANIO_ACTUAL + 1)), esErrorAnioFuturo);
  for (const invalido of ['abc', '', '2025.5', null, undefined]) {
    await assert.rejects(() => pipe.transform(invalido), /número entero/);
  }
});

test('GET /api/anios-lectivos/actual devuelve el año de PostgreSQL', async () => {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.get(PrismaService).$queryRaw = consultarAnio;
  app.get(PrismaService).sesion.findFirst = async () => ({ usuario: { idUsuario: 1 } });
  await app.listen(0, '127.0.0.1');
  try {
    const url = `${await app.getUrl()}/api/anios-lectivos/actual`;
    assert.equal((await fetch(url)).status, 401);
    const respuesta = await fetch(url, { headers: { Authorization: 'Bearer ' + 'A'.repeat(43) } });
    assert.equal(respuesta.status, 200);
    assert.deepEqual(await respuesta.json(), { anioActual: ANIO_ACTUAL });
    const futuro = await fetch(url.replace('/actual', '/' + (ANIO_ACTUAL + 1)), {
      headers: { Authorization: 'Bearer ' + 'A'.repeat(43) },
    });
    assert.equal(futuro.status, 400);
    assert.equal((await futuro.json()).message, MENSAJE_ANIO_FUTURO);
  } finally {
    await app.close();
  }
});

test('el rechazo de la base de datos se responde como 400 con el mensaje', async () => {
  const errorTrigger = new Prisma.PrismaClientUnknownRequestError(
    `PostgresError { code: "23514", message: "${MENSAJE_ANIO_FUTURO}" }`,
    { clientVersion: Prisma.prismaVersion.client },
  );

  // Controlador de prueba que simula el error del trigger y otro error cualquiera
  class PruebaController {
    trigger() { throw errorTrigger; }
    otro() { throw new Error('otro error'); }
  }
  for (const ruta of ['trigger', 'otro']) {
    const descriptor = Object.getOwnPropertyDescriptor(PruebaController.prototype, ruta);
    Get(ruta)(PruebaController.prototype, ruta, descriptor);
  }
  Controller('prueba')(PruebaController);

  class PruebaModule {}
  Module({ imports: [DatabaseModule, AniosLectivosModule], controllers: [PruebaController] })(PruebaModule);

  const app = await NestFactory.create(PruebaModule, { logger: false });
  await app.listen(0, '127.0.0.1');
  const base = await app.getUrl();
  try {
    const rechazo = await fetch(`${base}/prueba/trigger`);
    assert.equal(rechazo.status, 400);
    assert.deepEqual(await rechazo.json(), {
      statusCode: 400, message: MENSAJE_ANIO_FUTURO, error: 'Bad Request',
    });
    // Los demás errores siguen respondiendo 500
    assert.equal((await fetch(`${base}/prueba/otro`)).status, 500);
  } finally {
    await app.close();
  }
});
