/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "purple": "#6434AD",
        "transparent": "rgba(255, 255, 255, 0.20)"
      },
    },
  },
  plugins: [],
}

