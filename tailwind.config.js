/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      mirage: ["Made Mirage", "sans-serif"],
      acumin: ["Acumin Pro", "sans-serif"],
    },
    colors: {
      transparent: "transparent",
      serenade: {
        50: "#fff5eb",
        100: "#ffebd5",
        200: "#fed2aa",
        300: "#fdb274",
        400: "#fb873c",
        500: "#f96616",
        600: "#ea4c0c",
        700: "#c2370c",
        800: "#9a2c12",
        900: "#7c2712",
        950: "#431107",
      },
      tom: {
        50: "#f2f7ee",
        100: "#e3edda",
        200: "#c8dcba",
        300: "#a6c690",
        400: "#87af6c",
        500: "#68934f",
        600: "#50743c",
        700: "#3f5a31",
        800: "#3a502f",
        900: "#2f3f28",
        950: "#172112",
      },
    },
  },

  plugins: [],
};
