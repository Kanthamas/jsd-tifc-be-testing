import {
	startMongoServer,
	stopMongoServer,
} from "../setup/mongoMemoryServer.js";
import request from "supertest";
import app from "../../app.js";
import User from "../../models/user.model.js";
import { describe } from "vitest";

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
	describe("Happy path: Given valid data", () => {
		it("should create a user successfully", async () => {
			const newUser = {
				name: "John555",
				email: "john555@example.com",
				password: "iamjohnwick",
			};

			const response = await request(app)
				.post("/api/v1/users/auth/register")
				.send(newUser);

			expect(response.status).toBe(201);
			expect(response.body.message).toBe("Register a new user successfully");
			expect(response.body.data).toBe(newUser.email);

			// Confirm the user is saved in DB
			const userInDb = await User.findOne({ email: newUser.email });
      // console.log(userInDb)
			expect(userInDb).not.toBeNull();
			expect(userInDb.name).toBe(newUser.name);
		});
	});
	// describe("Edge cases: Given duplicate email", () => {});
	// describe("Negative path: Missing input", () => {});
});
