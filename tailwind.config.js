/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-purple": "#6D50BF",
        "light-purple": "#E0DFFE",
      },
    },
  },
  plugins: [],
};
