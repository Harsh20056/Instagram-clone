/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'instagram-blue': '#0095f6',
        'instagram-border': '#dbdbdb',
        'instagram-gray': '#8e8e8e',
      },
    },
  },
}
