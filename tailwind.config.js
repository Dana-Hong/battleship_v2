/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "board": "url('/public/board-bg.jpg')"
      },
      fontFamily: {
        "blackOpsOne": ["Black Ops One", "sans-serif"]
      }
    },
  },
  plugins: [],
}

