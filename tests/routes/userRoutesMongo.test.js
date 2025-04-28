import {
	startMongoServer,
	stopMongoServer,
} from "../setup/mongoMemoryServer.js";
import request from "supertest";
import app from "../../app.js";
import User from "../../models/user.model.js";

beforeAll(async () => {
	await startMongoServer();
});

afterAll(async () => {
	await stopMongoServer();
});

afterEach(async () => {
	await User.deleteMany();
});

// describe("POST /api/v1/users", () => {
// 	it("should run a simple test to check setup", () => {
// 		expect(true).toBe(true);
// 	});
// });

describe("POST /api/v1/users/auth/register", () => {
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
				name: "Bob Smith Duplicate",
				email: "bob@example.com",
				password: "newPassword",
			});

			expect(response.status).toBe(409);
			expect(response.body.error).toBe(true);
			expect(response.body.message).toBe("Email already used");
		});
	});

	describe("Negative path: Missing input", () => {
		it("should return an error if required fields are missing (Negative Path)", async () => {
			const response = await request(app).post(endpoint).send({
				email: "missing@name.com",
				// Missing name and password
			});

			expect(response.status).toBe(400);
			expect(response.body.error).toBe(true);
			expect(response.body.message).toBe("All fields are required");
		});
	});
});
