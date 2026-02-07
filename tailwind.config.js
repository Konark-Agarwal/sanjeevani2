/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'mygov-orange': '#e83b2a',
        'mygov-orange-light': '#f57c00',
        'mygov-blue': '#0066cc',
        'mygov-blue-dark': '#004a87',
        'mygov-gray': '#f5f5f5',
      },
      fontFamily: {
        'gov': ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gov-card': '0 2px 8px rgba(0,0,0,0.1)',
        'gov-hover': '0 4px 16px rgba(232,59,42,0.15)',
      }
    },
  },
  plugins: [],
}
