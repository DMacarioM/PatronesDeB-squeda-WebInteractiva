// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{html,js,jsx,tsx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       colors: {
        white: "#FFFFFF",
        black: "#000000",
        primary: "#53725D",
        secondary:"#E7863C",
        },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      layout: {},
      themes: {
        light: {},
        dark: {},
      },
    }),
  ],
};