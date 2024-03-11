/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'christmas-wallpaper': "url('giftally-header-wallpaper.png')",
      },
    },
  },
  plugins: [],
};
