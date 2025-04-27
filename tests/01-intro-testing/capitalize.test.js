import { capitalize } from "./capitalize.js";

describe("capitalize function - happy path", () => {
	it("should capitalize the first letter of a string and make the rest lowercase", () => {
		const str = "hello";
		const result = capitalize(str);
		expect(result).toBe("Hello");
	});

	it("should handle single character strings", () => {
		const str = "a";
		const result = capitalize(str);
		expect(result).toBe("A");
	});

	it("should capitalize the first letter and make the rest of the string lowercase", () => {
		const str = "hElLo";
		const result = capitalize(str);
		expect(result).toBe("Hello");
	});
});

describe("capitalize function - edge cases", () => {
	it("should return an empty string if the input is an empty string", () => {
		const str = "";
		const result = capitalize(str);
		expect(result).toBe("");
	});

	it("should return an empty string if the input is null or undefined", () => {
		expect(capitalize(null)).toBe("");
		expect(capitalize(undefined)).toBe("");
	});

	it("should handle leading and trailing spaces by trimming them", () => {
		const str = "   hello world   ";
		const result = capitalize(str);
		expect(result).toBe("Hello world");
	});
});

describe("capitalize function - negative path", () => {
	it("should return an empty string if the input is not a string", () => {
		expect(capitalize(123)).toBe("");
	});

	it("should return an empty string if the input is a non-string type", () => {
		expect(capitalize(true)).toBe("");
	});
});
