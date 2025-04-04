/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mainSkyblue: "#6CAFD9",
        subGray: "#333",
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6CAFD9",
          secondary: "#333",
        },
      },
      "light",
    ],
  },
};
