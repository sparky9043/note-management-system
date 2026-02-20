import { describe, test, after } from 'node:test';
import assert from 'node:assert';
import pool from '../../db/pool';
import app from '../app';
import supertest from 'supertest';

const api = supertest(app);
const baseUrl = '/api/notes';

void describe('GET Requests', () => {
  void test('/api/notes returns status 200 and all notes', async () => {
    const response = await api
      .get(baseUrl)
      .expect(200);
    
    assert.ok(response);
    assert(Array.isArray(response.body));
  });
});

after(async () => {
  await pool.end();
});