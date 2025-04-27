import { Router } from "express";
import * as noteController from "../controllers/noteController.js";

const router = Router();

// GET all notes
// router.get("/", noteController.getAllNotes);

// CREATE note
// router.post("/", noteController.createNote);

// ADD note --wip
router.post("/", noteController.addNote);

// EDIT note --todo
router.put("/:noteId", noteController.editNote);

// UPDATE note --todo
router.delete("/:noteId", noteController.deleteNote);

// DELETE note --todo

// GET notes by userId --wip
router.get("/", noteController.getNotesByUserId);

// SEARCH notes --wip
router.get("/", noteController.searchNotes);

export default router;
