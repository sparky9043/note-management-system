// Types for Notebooks, Sections, and Notes

// Notebook Types
interface NewNotebook {
  user_id: number;
  name: string;
}

interface Notebook extends NewNotebook {
  id: number;
  created_at: string;
}

// Section Types
interface NewSection {
  user_id: number;
  notebook_id: number;
  name: string;
}

interface Section extends NewSection {
  id: number;
  created_at: string;
}

// Entry Types
interface NewNoteEntry {
  user_id: number;
  section_id: number;
  tite: string;
  content: string;
}

interface NoteEntry extends NewNoteEntry {
  id: number;
  created_at: string;
}