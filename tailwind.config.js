module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        '2xl': '1536px',
        '1xl': '1636px',
        '3xl': '1736px',
      },
      colors: {
        laranja: {
          DEFAULT: "#F47920",
          claro: "#FAB683",
        },
        verde: {
          claro: "#B1D34B",
          DEFAULT: "#00995D",
          escuro: "#0A5F55",
        },
        marrom: {
          DEFAULT: "#682D00",
        },
        rosa: {
          DEFAULT: "#ED1651",
        },
        cinza: {
          escuro: "#5B5C65",
          DEFAULT: "#C4CBCF",
        },
        amarelo: {
          DEFAULT: "#FFCB08",
        },
        unimed: {

          green: '#00995D',

          pink: '#F0666F',

          purpe: '#A3238E',

          gray: '#5B5858',

          lightgray: '#F0F0F0',

          darkgray: '#3C3B3B',

          brown: '#682D00',

          orange: '#F47920',

          lightgreen: '#B1D34B',

          background: '#F7F7F7',

          beige: '#FFF0C7',

          white: '#FFFFFF',

          yellow: '#FFCB08',

          black: '#000000',

          purpeconecta: '#5E1995',

          bege_claro: '#FFF7E2',

          verdeclaro: '#9DFFA5',

          verde_background: '#62B054',
        },
      },
    },
  },
  plugins: [],
}