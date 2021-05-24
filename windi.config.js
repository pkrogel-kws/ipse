const colors = require("windicss/colors");
const typography = require("windicss/plugin/typography");
export default {
  attributify: true,
  darkMode: "class",
  plugins: [typography],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0096C7",
          50: "#AEEBFF",
          100: "#94E5FF",
          200: "#61D8FF",
          300: "#2ECCFF",
          400: "#00BCFA",
          500: "#0096C7",
          600: "#007094",
          700: "#004961",
          800: "#00232E",
          900: "#000000",
        },
      },
    },
  },
};
