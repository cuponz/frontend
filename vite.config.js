import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { purgeCss as tailwindPurgeCss } from "vite-plugin-tailwind-purgecss";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindPurgeCss(),
		compression(),
	],
	base: "http://localhost:3000/",
	resolve: {
		alias: {
			"@": "/src",
		},
		extensions: [".js", ".jsx"],
	},
	server: {
		warmup: {
			clientFiles: [
				"./src/routes.jsx",
				"./src/components/Wrapper/AuthWrapper.jsx",
				"./src/components/Utils/LoadingSpiner.jsx",
				"./src/components/Core/Navbar/index.jsx",
				"./src/api/base.js",
				"./src/languages.js",
			],
		},
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ""), // rewrites /api prefix
			},
		},
	},
});
