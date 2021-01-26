module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'bar-backdrop': "url('./bar-backdrop.jpg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
  prefix: 'tw-',
}
