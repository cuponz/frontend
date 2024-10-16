// vite.config.js
import { defineConfig } from "file:///home/newbee/prjs/cuponz_frontend/node_modules/vite/dist/node/index.js";
import react from "file:///home/newbee/prjs/cuponz_frontend/node_modules/@vitejs/plugin-react-swc/index.mjs";
import compression from "file:///home/newbee/prjs/cuponz_frontend/node_modules/vite-plugin-compression/dist/index.mjs";
import { ViteImageOptimizer } from "file:///home/newbee/prjs/cuponz_frontend/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
var vite_config_default = defineConfig((configEnv) => {
  const isDevelopment = configEnv.mode === "development";
  return {
    plugins: [
      react(),
      // tailwindPurgeCss(),
      // ViteWebp.default({
      // 	extensions: ["png", "jpg"],
      // }),
      ViteImageOptimizer(),
      compression()
    ],
    resolve: {
      alias: {
        "@": "/src"
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
        ".png"
      ]
    },
    server: {
      warmup: {
        clientFiles: [
          "./src/routes.jsx",
          "./src/components/Wrapper/AuthWrapper.jsx",
          "./src/components/Utils/LoadingSpiner.jsx",
          "./src/components/Core/Navbar/index.jsx",
          "./src/api/base.js",
          "./src/languages.js"
        ]
      },
      proxy: {
        "/api": "http://localhost:3000/",
        "/images": "http://localhost:3000/"
      }
    },
    build: {
      sourcemap: isDevelopment
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9uZXdiZWUvcHJqcy9jdXBvbnpfZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL25ld2JlZS9wcmpzL2N1cG9uel9mcm9udGVuZC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9uZXdiZWUvcHJqcy9jdXBvbnpfZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbi8vIGltcG9ydCB7IHB1cmdlQ3NzIGFzIHRhaWx3aW5kUHVyZ2VDc3MgfSBmcm9tIFwidml0ZS1wbHVnaW4tdGFpbHdpbmQtcHVyZ2Vjc3NcIjtcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjtcbmltcG9ydCB7IFZpdGVJbWFnZU9wdGltaXplciB9IGZyb20gXCJ2aXRlLXBsdWdpbi1pbWFnZS1vcHRpbWl6ZXJcIjtcbi8vIGltcG9ydCBWaXRlV2VicCBmcm9tIFwidml0ZS1wbHVnaW4td2VicC1nZW5lcmF0b3JcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoY29uZmlnRW52KSA9PiB7XG5cdGNvbnN0IGlzRGV2ZWxvcG1lbnQgPSBjb25maWdFbnYubW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiO1xuXHRyZXR1cm4ge1xuXHRcdHBsdWdpbnM6IFtcblx0XHRcdHJlYWN0KCksXG5cdFx0XHQvLyB0YWlsd2luZFB1cmdlQ3NzKCksXG5cdFx0XHQvLyBWaXRlV2VicC5kZWZhdWx0KHtcblx0XHRcdC8vIFx0ZXh0ZW5zaW9uczogW1wicG5nXCIsIFwianBnXCJdLFxuXHRcdFx0Ly8gfSksXG5cdFx0XHRWaXRlSW1hZ2VPcHRpbWl6ZXIoKSxcblx0XHRcdGNvbXByZXNzaW9uKCksXG5cdFx0XSxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRhbGlhczoge1xuXHRcdFx0XHRcIkBcIjogXCIvc3JjXCIsXG5cdFx0XHR9LFxuXHRcdFx0ZXh0ZW5zaW9uczogW1xuXHRcdFx0XHRcIi5tanNcIixcblx0XHRcdFx0XCIuanNcIixcblx0XHRcdFx0XCIubXRzXCIsXG5cdFx0XHRcdFwiLnRzXCIsXG5cdFx0XHRcdFwiLmpzeFwiLFxuXHRcdFx0XHRcIi50c3hcIixcblx0XHRcdFx0XCIuanNvblwiLFxuXHRcdFx0XHRcIi53ZWJwXCIsXG5cdFx0XHRcdFwiLmpwZ1wiLFxuXHRcdFx0XHRcIi5qcGVnXCIsXG5cdFx0XHRcdFwiLnBuZ1wiLFxuXHRcdFx0XSxcblx0XHR9LFxuXHRcdHNlcnZlcjoge1xuXHRcdFx0d2FybXVwOiB7XG5cdFx0XHRcdGNsaWVudEZpbGVzOiBbXG5cdFx0XHRcdFx0XCIuL3NyYy9yb3V0ZXMuanN4XCIsXG5cdFx0XHRcdFx0XCIuL3NyYy9jb21wb25lbnRzL1dyYXBwZXIvQXV0aFdyYXBwZXIuanN4XCIsXG5cdFx0XHRcdFx0XCIuL3NyYy9jb21wb25lbnRzL1V0aWxzL0xvYWRpbmdTcGluZXIuanN4XCIsXG5cdFx0XHRcdFx0XCIuL3NyYy9jb21wb25lbnRzL0NvcmUvTmF2YmFyL2luZGV4LmpzeFwiLFxuXHRcdFx0XHRcdFwiLi9zcmMvYXBpL2Jhc2UuanNcIixcblx0XHRcdFx0XHRcIi4vc3JjL2xhbmd1YWdlcy5qc1wiLFxuXHRcdFx0XHRdLFxuXHRcdFx0fSxcblx0XHRcdHByb3h5OiB7XG5cdFx0XHRcdFwiL2FwaVwiOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9cIixcblx0XHRcdFx0XCIvaW1hZ2VzXCI6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL1wiLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdGJ1aWxkOiB7XG5cdFx0XHRzb3VyY2VtYXA6IGlzRGV2ZWxvcG1lbnQsXG5cdFx0fSxcblx0fTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUixTQUFTLG9CQUFvQjtBQUNsVCxPQUFPLFdBQVc7QUFFbEIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUywwQkFBMEI7QUFJbkMsSUFBTyxzQkFBUSxhQUFhLENBQUMsY0FBYztBQUMxQyxRQUFNLGdCQUFnQixVQUFVLFNBQVM7QUFDekMsU0FBTztBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1IsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLTixtQkFBbUI7QUFBQSxNQUNuQixZQUFZO0FBQUEsSUFDYjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1IsT0FBTztBQUFBLFFBQ04sS0FBSztBQUFBLE1BQ047QUFBQSxNQUNBLFlBQVk7QUFBQSxRQUNYO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDUCxRQUFRO0FBQUEsUUFDUCxhQUFhO0FBQUEsVUFDWjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxNQUNBLE9BQU87QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLFdBQVc7QUFBQSxNQUNaO0FBQUEsSUFDRDtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ04sV0FBVztBQUFBLElBQ1o7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
