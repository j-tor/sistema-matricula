require('reflect-metadata');
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { createHash } = require('node:crypto');
const { hash } = require('bcryptjs');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { PrismaService } = require('../dist/database/prisma.service');

PrismaService.prototype.$connect = async () => {};
PrismaService.prototype.$disconnect = async () => {};

test('login con bcrypt, consulta de sesión, expiración y cierre', async () => {
  const usuario = { idUsuario: 1, nombreCompleto: 'Usuario de prueba', username: 'operador', rol: 'MATRICULADOR' };
  const cuenta = { ...usuario, activo: true, passwordHash: await hash('clave-de-prueba', 4) };
  const sesiones = new Map();
  const app = await NestFactory.create(AppModule, { logger: false });
  const prisma = app.get(PrismaService);
  prisma.usuario.findUnique = async ({ where }) => where.username === cuenta.username ? cuenta : null;
  prisma.usuario.updateMany = async () => ({ count: 1 });
  prisma.sesion.create = async ({ data }) => sesiones.set(data.tokenHash, data);
  prisma.sesion.findFirst = async ({ where }) => {
    const sesion = sesiones.get(where.tokenHash);
    return sesion && sesion.expiraEn > where.expiraEn.gt && cuenta.activo ? { usuario } : null;
  };
  prisma.sesion.deleteMany = async ({ where }) => {
    if (where.tokenHash) sesiones.delete(where.tokenHash);
  };
  prisma.$transaction = async (callback) => callback(prisma);

  await app.listen(0, '127.0.0.1');
  const base = (await app.getUrl()) + '/api/autenticacion';
  const login = (password) => fetch(base + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: usuario.username, password }),
  });

  try {
    assert.equal((await login()).status, 400);
    assert.equal((await login('incorrecta')).status, 401);
    cuenta.activo = false;
    assert.equal((await login('clave-de-prueba')).status, 401);
    cuenta.activo = true;
    assert.equal(sesiones.size, 0);

    const respuesta = await login('clave-de-prueba');
    assert.equal(respuesta.status, 200);
    assert.equal(respuesta.headers.get('cache-control'), 'no-store');
    const datos = await respuesta.json();
    assert.deepEqual(datos.usuario, usuario);
    const tokenHash = createHash('sha256').update(datos.token).digest('hex');
    const sesion = sesiones.get(tokenHash);
    assert.ok(sesion);
    assert.equal(sesion.expiraEn.toISOString(), datos.expiraEn);
    const headers = { Authorization: 'Bearer ' + datos.token };
    const consultar = () => fetch(base + '/sesion', { headers });
    assert.equal((await fetch(base + '/sesion')).status, 401);
    assert.deepEqual(await (await consultar()).json(), usuario);
    const cursos = base.replace('/autenticacion', '/cursos');
    assert.equal((await fetch(cursos, { method: 'POST' })).status, 401);
    const operaciones = [];
    prisma.conAuditoria = async (actor, callback) => {
      operaciones.push(actor);
      return callback(prisma);
    };
    prisma.curso.create = async ({ data }) => data;
    const crear = (datosCurso) => fetch(cursos, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(datosCurso),
    });
    const datosCurso = { codigo: '7mo', nombre: 'Séptimo', nivel: 'BASICA' };
    assert.equal((await crear({ ...datosCurso, idUsuario: 999 })).status, 400);
    assert.equal((await crear(datosCurso)).status, 201);
    assert.deepEqual(operaciones, [usuario.idUsuario]);
    cuenta.activo = false;
    assert.equal((await consultar()).status, 401);
    cuenta.activo = true;
    sesion.expiraEn = new Date(0);
    assert.equal((await consultar()).status, 401);
    sesion.expiraEn = new Date(datos.expiraEn);
    assert.equal((await fetch(base + '/logout', { method: 'POST', headers })).status, 204);
    assert.equal((await consultar()).status, 401);
    assert.equal(sesiones.size, 0);
  } finally {
    await app.close();
  }
});
