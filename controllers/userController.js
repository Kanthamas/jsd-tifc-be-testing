import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();

		res.json({ message: "Fectched users successfully", data: users });
	} catch (error) {
		next(error);
	}
};

export const createUser = async (req, res, next) => {
	try {
		const { name, email } = req.body;

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res
				.status(409)
				.json({ error: true, message: "Email already used" });
		}

		const user = new User({ name, email });

		await user.save();

		res.status(201).json({ message: "Created user successfully", data: user });
	} catch (error) {
		next(error);
	}
};

export const register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ error: true, message: "All fields are required" });
		}
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(409)
				.json({ error: true, message: "Email already used" });
		}
		const newUser = new User({ name, email, password });
		await newUser.save();
		res
			.status(201)
			.json({ message: "Register a new user successfully", data: email });
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ error: true, message: "All fields are required" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(401)
				.json({ error: true, message: "Invalid credentials" });
		}

		const isPasswordMatched = await bcrypt.compare(password, user.password);
		if (!isPasswordMatched) {
			return res
				.status(401)
				.json({ error: true, message: "Invalid credentials" });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		res.json({
			message: "Login successfully",
			token,
		});
	} catch (error) {
		next(error);
	}
};
