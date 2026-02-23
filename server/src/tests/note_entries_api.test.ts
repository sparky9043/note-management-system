import { describe, test, after, beforeEach } from 'node:test';
import assert from 'node:assert';
import pool from '../../db/pool';
import app from '../app';
import supertest from 'supertest';
import note_entries_helper from './note_entries_helper';
// import { NoteEntry } from '../types/notebook';
// import { NoteEntry } from '../types/notebook';

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

    assert.strictEqual(note_entries_helper.defaultNotes.length, response.body.length);
  });

  void test('/api/notes/:id returns status 200 and one note', async () => {
    const firstNoteEntry = note_entries_helper.defaultNotes[0];
    const noteEntriesInDb = await note_entries_helper.getNotesInDb();

    const noteEntryId = 1;

    const response = await api
      .get(`${baseUrl}/${noteEntryId}`)
      .expect(200);
    
    assert.ok(response);
    assert(typeof response.body === 'object');

    const titles = noteEntriesInDb.map(e => e.title);

    assert(titles.includes(firstNoteEntry.title));
  });
});

void describe('POST Requests', () => {
  void test('returns status 201, creates one note, and returns the note as JSON', async () => {
    const note = {
      title: 'this is not the end',
      content: 'You are doing a good job. Do NOT give up!',
    };

    const response = await api
      .post(baseUrl)
      .send(note)
      .expect(201);
    
    console.log(response.body);
  });
});

after(async () => {
  await pool.end();
});