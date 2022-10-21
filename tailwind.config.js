/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        "amatic-sc": "Amatic SC",
        "nunito": "Nunito"
      }
    },
    fontFamily: {
      sans: ["Nunito"]
    },
    colors: {
      'blue-violet': '#7918D9',
      'burnt-yellow': '#D9A918',
      'grape': '#6C3659',
      'bondi-blue': '#0893B9',
      'haiti': '#1F0F2B',
      'seashell': '#F1F1F1',
      'light-grey': '#D9DBDB',
      'black-cow': '#464646',
      'blue-violet-light': 'rgba(121, 24, 217, 0.5)',
      'burnt-yellow-light': 'rgba(217, 169, 24, 0.5)',
      'grape-light': 'rgba(108, 54, 89, 0.5)',
      'bondi-blue-light': 'rgba(8, 147, 185, 0.5)',
      'white': '#FFF',
      'black': '#000',
      'transparent': 'transparent',
      'gray': 'gray',
      'red': '#FF2400',
      'green': '#91D88B'
    }
  }
}
