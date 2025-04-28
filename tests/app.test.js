import request from "supertest";
import app from "./app.js";

describe("Health Check", () => {
	it("should respond with status 200 and OK message", async () => {
		const response = await request(app).get("/health-test");
		expect(response.status).toBe(200);
		expect(response.body.error).toBe(false);
		expect(response.body.message).toBe("OK");
	});
});
