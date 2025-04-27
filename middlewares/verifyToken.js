import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			return res.status(401).json({ error: true, message: "Access Denied" });
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { _id: decodedToken.userId };
		next();
	} catch (error) {
		const isExpired = error.name === "TokenExpiredError";
		if (isExpired) {
			return res
				.status(401)
				.json({ error: true, message: "Token has expired" });
		}
		next(error);
	}
};
