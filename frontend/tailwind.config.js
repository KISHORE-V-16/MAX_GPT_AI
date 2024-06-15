/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        "first":"#8ecae6",
        "second":" #219ebc"
      },
      textColor:{
        "newcolor":"#219ebc"
      },
      borderColor:{
        "newcolor":"#219ebc"
      }
    },
  },
  plugins: [],
}