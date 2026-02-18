import { NewNoteEntry, NoteEntry } from "../src/types/notebook";
import pool from "./pool";

const getNotes = async (): Promise<NoteEntry[]> => {
  const savedNotes = await pool.query<NoteEntry>(
    `
      SELECT * FROM note_entries;
    `
  );

  return savedNotes.rows;
};

const createNote = async (newNoteEntryObject: NewNoteEntry): Promise<NoteEntry> => {
  const { user_id, section_id, title, content } = newNoteEntryObject;

  if (!user_id || !section_id || !title || !content) {
    throw new Error('missing fields');
  }

  const savedNote = await pool.query<NoteEntry>(
    `
      INSERT INTO note_entries (user_id, section_id, title, content)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `,
    [Number(user_id), Number(section_id), title, content],
  );

  if (!savedNote.rows || !savedNote.rows.length) {
    throw new Error('unexpected error occurred');
  }

  return savedNote.rows[0];
};

export default { getNotes, createNote };