require('reflect-metadata');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { DatabaseService } = require('../dist/database/database.service');

test('API Nest: rutas, CORS y estados de conexión', async () => {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.enableCors({ origin: 'http://localhost:5174', credentials: true });
  const database = app.get(DatabaseService);
  database.authenticate = async () => {};
  await app.listen(0, '127.0.0.1');
  const base = await app.getUrl();
  try {
    const api = await fetch(`${base}/api`, { headers: { Origin: 'http://localhost:5174' } });
    assert.equal(api.status, 200);
    assert.equal(api.headers.get('access-control-allow-origin'), 'http://localhost:5174');
    assert.deepEqual(await api.json(), {
      message: 'API Sistema de Matrícula v1.0', endpoints: ['/health'],
    });
    const health = await fetch(`${base}/health`);
    assert.equal(health.status, 200);
    assert.deepEqual(await health.json(), { status: 'ok', db: 'connected' });
    database.authenticate = async () => { throw new Error('Database unavailable'); };
    const failed = await fetch(`${base}/health`);
    assert.equal(failed.status, 500);
    assert.deepEqual(await failed.json(), {
      status: 'error', db: 'disconnected', message: 'Database unavailable',
    });
    assert.equal((await fetch(`${base}/missing`)).status, 404);
  } finally {
    await app.close();
  }
});
