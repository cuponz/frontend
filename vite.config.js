import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { purgeCss as tailwindPurgeCss } from "vite-plugin-tailwind-purgecss";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
	console.log(configEnv);
	console.log(configEnv.mode === "development");
	return {
		plugins: [react(), tailwindPurgeCss(), compression()],
		base: "http://localhost:3000/",
		resolve: {
			alias: {
				"@": "/src",
			},
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
				"/api": "http://localhost:3000/",
				"/images": "http://localhost:3000/",
			},
		},
		build: {
			// sourcemap: false,
		},
	};
});
