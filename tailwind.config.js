/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          darkest: "#111827",
          dark: "#2d3a47",
          medium: "#475c73",
          light: "#c3cbd7",
          lightest: "#f0f2f5",
        },
        accent: {
          red: "#2d3a47",
          "red-light": "#c3cbd7",
          navy: "#111827",
        },
        ui: {
          white: "#ffffff",
          border: "#c3cbd7",
          "background-shade": "#f0f2f5",
          button: "#c83e2d",
        },
      },
      fontFamily: {
        sans: ["Open Sans", "system-ui", "sans-serif"],
        display: ["Open Sans", "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
