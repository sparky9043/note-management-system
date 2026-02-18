import { Request, Response, Router } from "express";
import query from "../../db/query";
import { NewNoteEntry, NoteEntry } from "../types/notebook";

const notesRouter = Router();

notesRouter.get('/', async (_req, res ,next) => {
  try {
    const savedNotes = await query.getNotes();
    res.json(savedNotes);
  } catch (error) {
    next(error);
  }
});

notesRouter.post('/', async (req: Request<unknown, unknown, NewNoteEntry>, res: Response<NoteEntry>, next) => {
  try {
    const savedNote = await query.createNote(req.body);
    res.json(savedNote);
  } catch (error) {
    next(error);
  }
});

export default notesRouter;