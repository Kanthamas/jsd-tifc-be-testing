import { Router } from "express";
// import db from "../db/tursodb.js";


const router = Router();

// CREATE user
// router.post("/", async (req, res, next) => {
// 	try {
// 		const { name, email } = req.body;

// 		if (!name || !email) {
// 			return res.status(400).json({ message: "Name and Email are required." });
// 		}

// 		const result = await db.execute({
// 			sql: `INSERT INTO users (name, email) VALUES (?,?)`,
// 			args: [name, email],
// 		});

// 		res.status(201).json({
// 			id: Number(result.lastInsertRowid),
// 			name,
// 			email,
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });

// GET all users
// router.get("/", async (req, res, next) => {
// 	try {
// 		const result = await db.execute({
// 			sql: `SELECT * FROM users`,
// 		});
// 		res.status(200).json(result.rows);
// 	} catch (error) {
// 		next(error);
// 	}
// });

/* router.get("/endpoint",async(req, res,next)=>{
	try {
		// logic
		// await 
		// res.json()
	} catch (error) {
		next(error)
	}
}) */

export default router;
