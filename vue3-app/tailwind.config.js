/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    gradientColorStops: theme => ({
      ...theme('colors'),
      'color1': '#e7f3f3',
      'color2': '#d0eaeb',
      'color3': '#252525',
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      'color4': '#1b1b1b',
      'color5': '#1f1f1f',
      'color6': '#252525',
      'color7': '#cacfd5',
      'color8': '#111111',
    }),
    boxShadow: {
      zz: '0px 1px 5px #eee',
      xx: '0px -1px 5px #eee',

    }
  }


}