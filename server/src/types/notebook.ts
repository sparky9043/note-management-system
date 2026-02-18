// Types for Notebooks, Sections, and Notes

// Notebook Types
export interface NewNotebook {
  user_id: number;
  name: string;
}

export interface Notebook extends NewNotebook {
  id: number;
  created_at: string;
}

// Section Types
export interface NewSection {
  user_id: number;
  notebook_id: number;
  name: string;
}

export interface Section extends NewSection {
  id: number;
  created_at: string;
}

// Entry Types
export interface NewNoteEntry {
  user_id: number;
  section_id: number;
  title: string;
  content: string;
}

export interface NoteEntry extends NewNoteEntry {
  id: number;
  created_at: string;
}