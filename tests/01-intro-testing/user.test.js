import { fetchUserName } from "./user.js";

describe("User Data", () => {
	describe("Happy path: Given userId", () => {
		it("should fetch user name successfully", async () => {
			const name = await fetchUserName(1);
			expect(name).toBe("John Doe");
		});
	});

	describe("Edge cases", () => {
		it("should throw error if userId is empty", async () => {
			await expect(fetchUserName()).rejects.toThrow("User ID is required");
		});

		it("should throw error if userId is invalid", async () => {
			await expect(fetchUserName(null)).rejects.toThrow("User ID is required");
		});
	});

	describe("Negative Path: User does not exist", () => {
		it("should throw error if user is not found", async () => {
			await expect(fetchUserName(3)).rejects.toThrow("User not found");
		});

		it("should throw error if userId is non-numeric", async () => {
			await expect(fetchUserName("abc")).rejects.toThrow(
				"User ID must be a number"
			);
		});
	});
});
