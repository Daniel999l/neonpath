/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-dark': '#0a0a2e',
        'neon-pink': '#ff2d95',
        'neon-cyan': '#00f5ff',
        'neon-purple': '#b44dff',
        'neon-card': '#12123a',
        'neon-border': '#2a2a5a',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0, 245, 255, 0.3)',
        'neon-pink': '0 0 15px rgba(255, 45, 149, 0.3)',
      },
    },
  },
  plugins: [],
}