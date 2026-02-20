import { describe, test, after, beforeEach } from 'node:test';
import assert from 'node:assert';
import pool from '../../db/pool';
import app from '../app';
import supertest from 'supertest';
import note_entries_helper from './note_entries_helper';

const api = supertest(app);
const baseUrl = '/api/notes';

beforeEach(async () => {
  await note_entries_helper.resetTable();
  for (const newNoteEntry of note_entries_helper.defaultNotes) {
    await note_entries_helper.insertNoteEntry(newNoteEntry);
  }
});

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