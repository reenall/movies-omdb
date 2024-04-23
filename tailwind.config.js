/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: "3rem",
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#64748b",
        secondary: "#94a3b8",
      },
      letterSpacing: {
        titleSpacing: "6px",
      },
      boxShadow: {
        'modalShadow': '0 0px 20px 5px',
      }
    },
  },
  plugins: [],
}

