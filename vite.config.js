import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { purgeCss as tailwindPurgeCss } from "vite-plugin-tailwind-purgecss";
import compression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import ViteWebp from "vite-plugin-webp-generator";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
	const isDevelopment = configEnv.mode === "development";
	return {
		plugins: [
			react(),
			tailwindPurgeCss(),
			// ViteWebp.default({
			// 	extensions: ["png", "jpg"],
			// }),
			ViteImageOptimizer(),
			compression(),
		],
		resolve: {
			alias: {
				"@": "/src",
			},
			extensions: [
				".mjs",
				".js",
				".mts",
				".ts",
				".jsx",
				".tsx",
				".json",
				".webp",
				".jpg",
				".jpeg",
				".png",
			],
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
			sourcemap: isDevelopment,
		},
	};
});
