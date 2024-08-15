/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        12: "12px",
        6: " 6px",
        20: " 20px",
      },
      container: {
        center: true,
        padding: "16px",
        screens: {
          sm: "680px",
          md: "808px",
          lg: "1280px",
          lx: "1340px",
        },
      },
    },
  },
  plugins: [],
};
