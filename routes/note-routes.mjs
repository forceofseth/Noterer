import express from 'express';
const router = express.Router();
import {noteController} from '../controller/note-controller';

router.get("/", noteController.getNotes.bind(noteController));
router.post("/", noteController.createNote.bind(noteController));
router.get("/:id/", noteController.getNote.bind(noteController));
router.put("/:id", noteController.updateOrder.bind(noteController));

export const noteRoutes = router;