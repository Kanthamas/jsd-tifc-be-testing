import chalk from "chalk";

const errorHandler = (err, req, res, next) => {
	const statusCode = err.status || 500;
	const message = err.message || "Internal Server Error";

	const response = {
		status: statusCode,
		message,
	};

	if (process.env.NODE_ENV === "development") {
		response.stack = err.stack;
	}

	console.error(chalk.bgRed(`💥Something went wrong!💥\n ${err.stack}`));

	res.status(err.status).json(response);
};

export default errorHandler;
