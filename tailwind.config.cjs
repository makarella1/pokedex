/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        appear: {
          from: { opacity: "0" },
          to: { opacity: "0.7" },
        },
        modal: {
          from: { opacity: "0", transform: "translateY(100%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "backdrop-appear": "appear 0.5s forwards",
        "modal-appear": "modal 0.5s forwards",
      },
    },
  },
  plugins: [],
};
