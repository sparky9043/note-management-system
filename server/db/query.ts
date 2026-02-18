import { NoteEntry } from "../src/types/notebook";
import pool from "./pool";

const getNotes = async (): Promise<NoteEntry[]> => {
  const savedNotes = await pool.query<NoteEntry>(
    `
      SELECT * FROM note_entries;
    `
  );

  return savedNotes.rows;
};

export default { getNotes };