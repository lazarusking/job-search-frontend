/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-green": "linear-gradient(98.24deg,#cee9c1 0,#83c8de 100%)",
        "gradient-cyan":"linear-gradient(90deg,#6cd5f6 0,#f89d5c 50%,#5b6af0 100%)"
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
