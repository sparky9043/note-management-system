import http from "../src/errors/http";
import { NewNoteEntry, NoteEntry } from "../src/types/notebook";
import pool from "./pool";

const getNotes = async (): Promise<NoteEntry[]> => {
  const response = await pool.query<NoteEntry>(
    `
      SELECT * FROM note_entries;
    `
  );

  return response.rows;
};

const getNoteById = async (noteId: number): Promise<NoteEntry> => {
  const response = await pool.query<NoteEntry>(
    `
      SELECT * FROM note_entries WHERE id = $1;
    `,
    [Number(noteId)]
  );

  if (!response.rows || !response.rows.length) {
    throw new http.NotFoundError('no notes found by that id');
  }

  return response.rows[0];
};

const createNote = async (newNoteEntryObject: NewNoteEntry): Promise<NoteEntry> => {
  const { user_id, section_id, title, content } = newNoteEntryObject;

  if (!user_id || !section_id || !title || !content) {
    throw new Error('missing fields');
  }

  const response = await pool.query<NoteEntry>(
    `
      INSERT INTO note_entries (user_id, section_id, title, content)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `,
    [Number(user_id), Number(section_id), title, content],
  );

  if (!response.rows || !response.rows.length) {
    throw new Error('unexpected error occurred');
  }

  return response.rows[0];
};

export default { getNotes, createNote, getNoteById };