import { Router } from "express";
// import db from "../db/tursodb.js";


const router = Router();

// CREATE note
// router.post("/", async (req, res, next) => {
// 	try {
// 		const { title, content, tags = [], is_pinned = false, user_id } = req.body;

// 		if (!user_id) {
// 			return res.status(400).json({ message: "User ID is required" });
// 		}

// 		const result = await db.execute({
// 			sql: `INSERT INTO notes (title, content, tags, is_pinned, user_id) VALUES (?,?,?,?,?)`,
// 			args: [title, content, JSON.stringify(tags), is_pinned ? 1 : 0, user_id],
// 		});

// 		res.status(201).json({
// 			id: Number(result.lastInsertRowid),
// 			title,
// 			content,
// 			tags,
// 			is_pinned,
// 			user_id,
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });

// GET all notes
// router.get("/", async (req, res, next) => {
// 	try {
// 		const result = await db.execute({
// 			sql: `SELECT * FROM notes`,
// 		});
// 		res.status(200).json(result.rows);
// 	} catch (error) {
// 		next(error);
// 	}
// });

export default router;
