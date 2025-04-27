import { Schema, model } from "mongoose";

const noteSchema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		content: { type: String, required: true, trim: true },
		tags: { type: [String], default: [] },
		isPinned: { type: Boolean, default: false },
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Note = model("Note", noteSchema);
export default Note;
