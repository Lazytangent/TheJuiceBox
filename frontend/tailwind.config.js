module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'bar-backdrop': "url('https://the-juice-box.s3.us-east-2.amazonaws.com/HideoutInterior_SarahLarson.0.webp')",
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
