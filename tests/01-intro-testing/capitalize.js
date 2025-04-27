export const capitalize = (str) => {
	if (typeof str !== "string" || !str) {
		return "";
	}
	const trimmedStr = str.trim();
	return trimmedStr.charAt(0).toUpperCase() + trimmedStr.slice(1).toLowerCase();
};
