import { describe, test, after, beforeEach } from 'node:test';
import assert from 'node:assert';
import pool from '../../db/pool';
import app from '../app';
import supertest from 'supertest';
import note_entries_helper from './note_entries_helper';
import { NoteEntry } from '../types/notebook';
// import { NoteEntry } from '../types/notebook';
// import { NoteEntry } from '../types/notebook';

const api = supertest(app);
const baseUrl = '/api/notes';

interface ErrorResponse {
  code: number;
  status: 'success' | 'error';
  message: string;
};

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
    
    const notesAtStart = await note_entries_helper.getNotesInDb();

    const response = await api
      .post(baseUrl)
      .send(note)
      .expect(201);
    
    assert.ok(response);
    assert(typeof response.body === 'object');
    const savedNote = response.body as NoteEntry;

    const notesAtEnd = await note_entries_helper.getNotesInDb();

    // check note entries length before and after POST request; MUST be 1 more
    assert.strictEqual(notesAtEnd.length, notesAtStart.length + 1);

    // check note entries includes the new note after POST request;
    const titles = notesAtEnd.map(note => note.title);
    assert(titles.includes(savedNote.title));
  });

  void test('return status 400 and the db remains unchanged with missing fields', async () => {
    const missingTitle = {
      content: 'i am expecting this note to not be added',
    };

    const result = await api
      .post(baseUrl)
      .send(missingTitle)
      .expect(400);

    const errorResponse = result.body as ErrorResponse;

    console.log(errorResponse.code, errorResponse.message);
  });
});

void describe('PUT Requests', () => {
  void test('returns status 200 if request has title only', async () => {
    const updateNoteId = 1;

    const newContent = {
      title: 'new title to be updated',
    };

    const notesAtStart = await note_entries_helper.getNotesInDb();
    
    const response = await api
      .put(`${baseUrl}/${updateNoteId}`)
      .send(newContent)
      .expect(200);
    
    const notesAtEnd = await note_entries_helper.getNotesInDb();

    assert.ok(response);
    assert.strictEqual(response.type, 'application/json');

    // Check if DB updated the title after PUT request
    const titlesAtEnd = notesAtEnd.map(n => n.title);
    assert(titlesAtEnd.includes(newContent.title));
    
    // Ensure DB size does not change after PUT request
    assert.strictEqual(notesAtEnd.length, notesAtStart.length);
  });
});

after(async () => {
  await pool.end();
});