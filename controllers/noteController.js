import Note from "../models/note.model.js";

/* export const getAllNotes = async (req, res, next) => {
	try {
		const notes = await Note.find().sort({ isPinned: -1, createdAt: -1 });

		res.json({ message: "Fectched notes successfully", data: notes });
	} catch (error) {
		next(error);
	}
}; */

/* export const createNote = async (req, res, next) => {
	try {
		const { title, content, tags = [], isPinned = false, userId } = req.body;

		if (!userId) {
			return res
				.status(401)
				.json({ message: "Invalid or missing User ID", error: true });
		}

		const note = await Note.create({
			title,
			content,
			tags,
			isPinned,
			userId,
		});

		res.status(201).json({ message: "Created note successfully", data: note });
	} catch (error) {
		next(error);
	}
}; */

export const addNote = async (req, res, next) => {
	try {
		const { title, content, tags = [], isPinned = false } = req.body;
		const user = req.user;

		if (!title || !content) {
			return res
				.status(400)
				.json({ error: true, message: "Title and Content are required" });
		}

		if (!user) {
			return res
				.status(401)
				.json({ error: true, message: "Invalid user credentials" });
		}

		const newNote = new Note({
			title,
			content,
			tags,
			isPinned,
			userId: user._id,
		});

		await newNote.save();

		res.json({ message: "Note added successfully", newNote });
	} catch (error) {
		next(error);
	}
};

export const editNote = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

export const updateNote = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

export const deleteNote = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

export const getNotesByUserId = async (req, res, next) => {
	try {
		const user = req.user;
		const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
		res.json({ message: "All notes retrieved", notes });
	} catch (error) {
		next(error);
	}
};

export const searchNotes = async (req, res, next) => {
	try {
		const { user } = req.body;
		const { query } = req.query;

		if (!query) {
			const notes = await Note.find({ userId: user._id }).sort({
				isPinned: -1,
			});
			return res.json({ message: "All notes retrieved", notes });
		}

		const matchingNotes = await Note.find({
			userId: user._id,
			$or: [
				{ title: { $regex: new ReqExp(query, "i") } },
				{ content: { $regex: new ReqExp(query, "i") } },
			],
		});

		res.json({ message: "Notes from search", matchingNotes });
	} catch (error) {
		next(error);
	}
};
