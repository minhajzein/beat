/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-red': '#E20941',
        'theme-purple': '#461BA6'
      },
      fontFamily: {
        merriweather: ['"Merriweather Sans"', 'serif']
      }
    },
  },
  plugins: [],
}