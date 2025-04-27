export const sum = (num1, num2) => {
	 if (typeof num1 !== "number" || typeof num2 !== "number") {
			return NaN;
		}
	return num1 + num2;
};
