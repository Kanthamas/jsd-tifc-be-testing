import {
	startMongoServer,
	stopMongoServer,
} from "../setup/mongoMemoryServer.js";
import request from "supertest";
import app from "../../app.js";
import User from "../../models/user.model.js";

beforeAll(async () => {
	process.env.JWT_SECRET = "testsecret";
	await startMongoServer();
});

afterAll(async () => {
	await stopMongoServer();
});

let user;
beforeAll(async () => {
	const userData = {
		name: "Test User",
		email: "testuser@example.com",
		password: "securePassword123",
	};
	try {
		user = new User(userData);
		await user.save();
		// console.log("Test user created and saved:", user);
	} catch (error) {
		console.error("Error saving test user:", error);
	}
});

// describe("POST /api/v1/users", () => {
// 	it("should run a simple test to check setup", () => {
// 		expect(true).toBe(true);
// 	});
// });

describe("POST /auth/register", () => {
	const endpoint = "/api/v1/users/auth/register";
	describe("Happy path: Given valid data", () => {
		it("should create a user successfully", async () => {
			const newUser = {
				name: "John555",
				email: "john555@example.com",
				password: "iamjohnwick",
			};

			const response = await request(app).post(endpoint).send(newUser);

			expect(response.status).toBe(201);
			expect(response.body.message).toBe("Register a new user successfully");
			expect(response.body.data).toBe(newUser.email);

			// Confirm the user is saved in DB //
			const userInDb = await User.findOne({ email: newUser.email });
			// console.log(userInDb)
			expect(userInDb).not.toBeNull();
			expect(userInDb.name).toBe(newUser.name);
		});
	});

	describe("Edge cases: Given duplicate email", () => {
		it("should return an error if email is already used", async () => {
			const existingUser = new User({
				name: "Bob Smith",
				email: "bob@example.com",
				password: "anotherPassword",
			});
			await existingUser.save();

			const response = await request(app).post(endpoint).send({
				name: "Bob Smith Duplicate 555",
				email: "bob@example.com",
				password: "newPassword",
			});

			expect(response.status).toBe(409);
			expect(response.body.error).toBe(true);
			expect(response.body.message).toBe("Email already used");
		});
	});

	describe("Negative path: Missing input", () => {
		it("should return an error if required fields are missing", async () => {
			const response = await request(app).post(endpoint).send({
				email: "missing555@name.com",
				// Missing name and password
			});

			expect(response.status).toBe(400);
			expect(response.body.error).toBe(true);
			expect(response.body.message).toBe("All fields are required");
		});
	});
});

describe("POST /auth/login", () => {
	const endpoint = "/api/v1/users/auth/login";
	describe("Happy path: Given valid credentials", () => {
		// beforeEach(async () => {
		// 	const userInDb = await User.findOne({ email: "testuser@example.com" });
		// 	console.log("Found User in DB:", userInDb);
		// });

		it("should login successfully and return a token", async () => {
			const response = await request(app).post(endpoint).send({
				email: "testuser@example.com",
				password: "securePassword123",
			});

			expect(response.status).toBe(200);
			expect(response.body.message).toBe("Login successfully");
			expect(response.body.token).toBeDefined();
		});
	});

	describe("Edge cases: Given wrong password or email", () => {
		it("should return an error if password is incorrect", async () => {
			const response = await request(app).post(endpoint).send({
				email: user.email,
				password: "wrongPassword",
			});

			expect(response.status).toBe(401);
			expect(response.body.error).toBe(true);
			expect(response.body.message).toBe("Invalid credentials 89");
		});

		it("should return an error if email does not exist", async () => {
			const response = await request(app).post(endpoint).send({
				email: "nonexistent@example.com",
				password: user.password,
			});

			expect(response.status).toBe(401);
			expect(response.body.error).toBe(true);
			expect(response.body.message).toBe("Invalid credentials 73");
		});
	});

	describe("Negative path: Missing input", () => {
		it("should return an error if required fields are missing", async () => {
			const response = await request(app).post(endpoint).send({
				email: "",
				password: "",
			});

			expect(response.status).toBe(400);
			expect(response.body.error).toBe(true);
			expect(response.body.message).toBe("All fields are required");
		});
	});
});
