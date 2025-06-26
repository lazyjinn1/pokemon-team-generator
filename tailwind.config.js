/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
 theme: {
    extend: {
      textShadow: {
        black: '1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-outline-black': {
          textShadow: '1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black',
        },
      });
    },
  ],

  safelist: [
  {
    pattern: /(from|to)-(red|blue|green|gray|yellow|purple|indigo|pink|lime)-(200|300|400|500|600|700|800|900)/,
  },
],
}