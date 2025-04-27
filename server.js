import chalk from "chalk";
import connectMongoDB from "./db/mongodb.js";
import app from "./app.js";

const URL = process.env.URL || "http://localhost";
const PORT = process.env.PORT || 3030;

const startServer = async () => {
	try {
		await connectMongoDB();
		app.listen(PORT, () =>
			console.log(chalk.bgBlueBright(`Server running on ${URL}:${PORT}`))
		);
	} catch (err) {
		console.error(chalk.bgRedBright("Failed to start server:\n", err));
		process.exit(1);
	}
};

startServer();
