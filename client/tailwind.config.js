/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xl: "1000px", // custom breakpoint
      },
      colors: {
        "custom-black": "#333333",
        "custom-gold": "#E2C044",
        "custom-green": "#587B7F",
        "custom-onyx": "#393E41",
        "custom-berkeley-blue": "#1d3557",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
