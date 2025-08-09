/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",  // for HTML files
    "./src/**/*.{js,jsx,ts,tsx}",  // for JS/JSX/TS/TSX files (if using React, Vue, or similar)
    // Add other paths as needed, e.g. "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
