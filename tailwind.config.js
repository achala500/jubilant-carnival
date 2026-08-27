/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC05',
          green: '#34A853',
        },
        bio: '#10b981', // emerald-500
        maths: '#3b82f6', // blue-500
        physics: '#f59e0b', // amber-500
        chemistry: '#ef4444', // red-500
      }
    },
  },
  plugins: [],
}
