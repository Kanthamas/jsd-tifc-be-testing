import mongoose from "mongoose";
import chalk from "chalk";

const MONGO_URI = process.env.MONGO_URI;

const connectMongoDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log(
			chalk.bgGreen(
				`Connected to MongoDB successfully\nDB: ${mongoose.connection.name}`
			)
		);
	} catch (error) {
		console.error(chalk.bgMagenta(`Failed to connect MongoDB\n ${error}`));
		process.exit(1);
	}
};

export default connectMongoDB;
