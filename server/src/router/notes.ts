import { Router } from "express";
import query from "../../db/query";

const notesRouter = Router();

notesRouter.get('/', async (_req, res ,next) => {
  try {
    const savedNotes = await query.getNotes();
    res.json(savedNotes);
  } catch (error) {
    next(error);
  }
});

export default notesRouter;