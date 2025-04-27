import crypto from "node:crypto";

const random = crypto.randomBytes(64).toString("hex");

console.log(random);
