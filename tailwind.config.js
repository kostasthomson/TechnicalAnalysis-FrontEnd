/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom' : '0px 0px 13px -2px rgba(0,0,0,0.81)'
      }
    },
  },
  plugins: [],
};

