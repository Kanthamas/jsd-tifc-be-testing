// user.js
export const fetchUserName = async (userId) => {
	if (!userId) {
		throw new Error("User ID is required");
	}
	if (typeof userId !== "number" || isNaN(userId)) {
		throw new Error("User ID must be a number");
	}
	// Simulating fetching user data from an API
	const users = [
		{ id: 1, name: "John Doe" },
		{ id: 2, name: "Jane Smith" },
	];

	const user = users.find((user) => user.id === userId);
	if (!user) throw new Error("User not found");

	return user.name;
};
