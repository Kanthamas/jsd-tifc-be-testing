# 📚 Testing Fundamentals - `note.md`

## 1. What is Testing?

- **Testing** means checking if your code works the way you expect.
- It helps catch mistakes early (before users find them).

---

## 2. Why Do We Write Tests?

✅ To **prove** our code works  
✅ To **catch bugs** early  
✅ To **make changes safely** later (without breaking things)

---

## 3. Basic Testing Terms

| Term           | Meaning                                                           |
| :------------- | :---------------------------------------------------------------- |
| **Test**       | A single check to see if something works                          |
| **Test Suite** | A group of related tests                                          |
| **Test Case**  | An individual test within a suite                                 |
| **Assertion**  | A claim that something is true (e.g., `expect(sum(2,3)).toBe(5)`) |
| **Matcher**    | A function that checks values (e.g., `toBe`, `toEqual`)           |

---

## 4. How to Design Test Suite and Test Cases

### **Step 1: Understand the Functionality**

- Group related **test cases** into a **test suite**.
- A **test suite** should represent a module or feature of your application (e.g., "Login", "User Profile", "API endpoints").

### **Step 2: Write High-Level Tests First**

- Start with tests that represent the **"happy path"** — the most common use cases where everything works as expected.
- After verifying the happy path, testers usually expand their testing to cover edge cases, error scenarios, and negative paths (e.g., incorrect input, missing data, or unexpected behavior).

### **Step 3: Cover Edge Cases**

- Think about **edge cases** (e.g., invalid input, empty values, unexpected data) and include tests for them.

### **Step 4: Ensure Test Coverage**

- Test all possible scenarios, including both success and failure paths.
- Ensure you are testing **boundary conditions** (e.g., empty arrays, maximum values).

### **Step 5: Use Descriptive Test Names**

- Use descriptive names for your tests.
- Follow the **Given-When-Then** format:
  - **Given** some initial state
  - **When** an action is performed
  - **Then** the expected result occurs

### **Step 6: Use the AAA Pattern**

- Follow the **Arrange-Act-Assert** pattern for consistency:
  - **Arrange**: Setup the necessary data or state.
  - **Act**: Perform the action being tested.
  - **Assert**: Verify that the action produces the expected result.

---

## 5. The AAA Pattern (Arrange-Act-Assert)

The **AAA pattern** is a helpful structure for writing tests in a clear and logical way.

| Step        | Purpose                                         |
| :---------- | :---------------------------------------------- |
| **Arrange** | Setup the values or objects needed for the test |
| **Act**     | Call the function or method being tested        |
| **Assert**  | Check if the result matches what we expected    |

**Why use AAA?**

- Makes tests **more readable**
- Ensures tests have **clear structure**
- Helps **debug quickly** by knowing where something might have gone wrong

---

## 6. Test Matchers: `toBe` vs `toEqual`

### `toBe`

- Use `toBe` for **primitive values** (strings, numbers) or when checking if two references are strictly equal.

#### Example:

```javascript
expect(5).toBe(5); // ✅ Passes
expect("hello").toBe("hello"); // ✅ Passes
expect(5).toBe("5"); // ❌ Fails because types are different (number vs string)
```

### `toEqual`

- Use `toEqual` when comparing objects or arrays, as it checks for deep equality (i.e., comparing values inside the object or array).

```javascript
const obj1 = { name: "John", age: 25 };
const obj2 = { name: "John", age: 25 };

expect(obj1).toEqual(obj2); // ✅ Passes
expect(obj1).toBe(obj2); // ❌ Fails because they are different references
```

---

## 7. Folder Structure for Tests

```
01-intro-testing/
    ├── sum.js
    └── capitalize.js

tests/
└── 01-intro-testing/
    ├── sum.test.js
    └── capitalize.test.js

```

---

## 8. Good Testing Practices

✅ Write small and focused tests (one thing at a time)
✅ Name tests clearly (what it should do)
✅ Use the Arrange-Act-Assert pattern:

- Arrange: setup data

- Act: run the function

- Assert: check result

---

## 9. How to Run Tests

- Install `vitest`
  ```
  npm install -D vitest
  ```
- Edit `package.json`
  ```
  "scripts": {
  	"start": "node --watch --env-file=.env server.js",
  	"test": "vitest"
  }
  ```
- Add `vitest.config.js`
  ```javascript
  // vitest.config.js
  import { defineConfig } from "vitest/config";
  export default defineConfig({
  	test: {
  		globals: true,
  	},
  });
  ```
- Run tests

  ```
  npm test
  ```

---

## 10. Code Examples

`sum.js`

```javascript
// sum.js
export function sum(num1, num2) {
	return num1 + num2;
}
```

### Test Case Design

| Test Case ID | Test Description                                        | Input Data                 | Expected Result | Comments                                         |
| ------------ | ------------------------------------------------------- | -------------------------- | --------------- | ------------------------------------------------ |
| TC-01        | Happy Path: Add two positive numbers                    | num1 = 2, num2 = 3         | 5               | Verifies sum of two positive numbers.            |
| TC-02        | Happy Path: Add a positive number and a negative number | num1 = 2, num2 = -3        | -1              | Verifies sum of positive and negative numbers.   |
| TC-03        | Happy Path: Add two zeros                               | num1 = 0, num2 = 0         | 0               | Verifies sum of two zeros.                       |
| TC-04        | Negative Path: One argument is a string                 | num1 = "2", num2 = 3       | NaN             | Verifies result when one argument is a string.   |
| TC-05        | Negative Path: Both arguments are strings               | num1 = "2", num2 = "3"     | NaN             | Verifies result when both arguments are strings. |
| TC-06        | Negative Path: One argument is null                     | num1 = null, num2 = 3      | NaN             | Verifies result when one argument is null.       |
| TC-07        | Negative Path: One argument is undefined                | num1 = undefined, num2 = 3 | NaN             | Verifies result when one argument is undefined.  |

`sum.test.js`

```javascript
// sum.test.js
import { sum } from "../01-intro-testing/sum.js";

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
```
