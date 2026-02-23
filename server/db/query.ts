import httpErrors from "../src/errors/httpErrors";
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
    throw new httpErrors.NotFoundError('no notes found by that id');
  }

  return response.rows[0];
};

const createNote = async (newNoteEntryObject: NewNoteEntry): Promise<NoteEntry> => {
  const { title, content } = newNoteEntryObject;

  if (!title || !content) {
    throw new httpErrors.ValidationError('please fill out all the required fields');
  }

  const response = await pool.query<NoteEntry>(
    `
      INSERT INTO note_entries (title, content)
      VALUES ($1, $2) RETURNING *;
    `,
    [title, content],
  );

  if (!response.rows || !response.rows.length) {
    throw new httpErrors.HttpError('unexpected error occurred');
  }

  return response.rows[0];
};

const updateNoteById = async (noteId: number, newNoteEntryObject: NewNoteEntry): Promise<NoteEntry> => {
  if (!newNoteEntryObject.title && !newNoteEntryObject.content) {
    throw new httpErrors.ValidationError('you must fill either title or content');
  }

  const savedNote = await getNoteById(noteId);

  if (!savedNote) {
    throw new httpErrors.NotFoundError('the requested note was not found');
  }

  let newTitle: string;
  let newContent: string;

  if (newNoteEntryObject.title && newNoteEntryObject.content) {
    newTitle = newNoteEntryObject.title;
    newContent = newNoteEntryObject.content;

    const response = await pool.query<NoteEntry>(
      `
        UPDATE note_entries SET title = $1, content = $2 WHERE id = $3 RETURNING *;
      `,
      [newTitle, newContent, Number(noteId)],
    );

    return response.rows[0];
  }
  
  console.log(noteId);
};

export default { getNotes, createNote, getNoteById, updateNoteById };