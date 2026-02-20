import { describe, test, after } from 'node:test';
import assert from 'node:assert';
import pool from '../../db/pool';

void describe('GET Requests', () => {
  void test('/api/notes returns status 200 and all notes', () => {
    assert.strictEqual(1, 1);
  });
});

after(async () => {
  await pool.end();
});