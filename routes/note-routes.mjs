import express from 'express';
const router = express.Router();
import {noteController} from '../controller/note-controller.mjs';

router.get("/", noteController.getNotes.bind(noteController));
router.post("/", noteController.createNote.bind(noteController));
router.get("/:id/", noteController.getNote.bind(noteController));
router.put("/", noteController.updateNote.bind(noteController));

export const noteRoutes = router;