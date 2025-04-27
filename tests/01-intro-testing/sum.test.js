import { sum } from "./sum.js";

describe("sum function - happy path", () => {
	it("should return the correct result for adding two positive numbers", () => {
		// Arrange
		const num1 = 2;
		const num2 = 3;

		// Act
		const result = sum(num1, num2);

		// Assert
		expect(result).toBe(5);
	});

	it("should return the correct result for adding a positive and a negative number", () => {
		const num1 = 2;
		const num2 = -3;
		const result = sum(num1, num2);
		expect(result).toBe(-1);
	});

	it("should return 0 when adding two zeros", () => {
		expect(sum(0, 0)).toBe(0);
	});
});

describe("sum function - negative path", () => {
	it("should return NaN if one argument is a string", () => {
		// Arrange
		const num1 = "2";
		const num2 = 3;

		// Act
		const result = sum(num1, num2);

		// Assert
		expect(result).toBeNaN();
	});

	it("should return NaN if both arguments are strings", () => {
		const num1 = "2";
		const num2 = "3";
		const result = sum(num1, num2);
		expect(result).toBeNaN();
	});

	it("should return NaN if one argument is null", () => {
		expect(sum(null, 3)).toBeNaN();
	});

	it("should return NaN if one argument is undefined", () => {
		expect(sum(undefined, 3)).toBeNaN();
	});
});
