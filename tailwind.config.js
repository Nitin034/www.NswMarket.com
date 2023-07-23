/** @type {import('tailwindcss').Config} */
module.exports = {
     content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},

    screens:{
      "2xl": {max:"1535px"},
      // => @media(max-width: 1535px)
      xl: {max: "1279px"},
      // => @media (max-width: 1279px)
      lg: {max: "1023px"},
      // => @media (max-width: 1023px)
      md: {max: "767px"},
      // => @media (max-width: 767px)
      sm: {max: "639px"},
      // => @media (max-width: 639px)
      xs: {max: "479px"},
      // => @media (max-width: 479px)
      lgs: {min: "1023"},
    },

    colors: {
      gray: {100: "#808080", 200: "#494859", 300: "#003366"},
      white: "#fff",
      dark: "#000",
      cyan: "#14ffec",
      red: "#d6436e",
      green: "#25da72",
    },
    fontSize: {
      xs: "10px",
      sm: "14px",
      md: "18px",
      lg: "24px",
      xl: "32px",
      base: "16px",
    }
  },
  plugins: [require("tailwind-scrollbar")],
}

