module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      serif: ['"Josefin Slab"', 'serif'],
      sans: ['"Mukta Vaani"', 'sans-serif'],
      mono: ['"Fira Code"', 'mono'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: {
        lighest: '#545454',
        light: '#424242',
        DEFAULT: '#212121',
        subtle: '#303030',
      },
      asphalt: {
        DEFAULT: '#1e1c31',
        subtle: '#100e23',
        dark: '#565575',
      },
      gray: {
        lightest: '#c6c6c6',
        light: '#b2b2b2',
        DEFAULT: '#767676',
      },
      white: {
        DEFAULT: '#f3f3f3',
        actual: '#ffffff',
      },
      red: {
        DEFAULT: '#ff8080',
        dark: '#ff5458',
      },
      green: {
        DEFAULT: '#95ffa4',
        dark: '#62d196',
      },
      yellow: {
        DEFAULT: '#ffe9aa',
        dark: '#ffb378',
      },
      blue: {
        DEFAULT: '#91ddff',
        dark: '#65b2ff',
      },
      purple: {
        DEFAULT: '#c991e1',
        dark: '#906cff',
      },
      cyan: {
        DEFAULT: '#aaffe4',
        dark: '#63f2f1',
      },
      clouds: {
        DEFAULT: '#cbe3e7',
        dark: '#a6b3cc',
      },
    },
    extend: {
      backgroundImage: theme => ({
        'bar-backdrop': "url('https://the-juice-box.s3.us-east-2.amazonaws.com/HideoutInterior_SarahLarson.0.webp')",
      }),
      gridTemplateRows: {
        'layout': 'auto minmax(900px, 1fr) auto',
      },
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
