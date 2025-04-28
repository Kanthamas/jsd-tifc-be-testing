// vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		setupFiles: "./tests/setup/mongoMemoryServer.js",
		globals: true,
		verbose: true,
	},
});
