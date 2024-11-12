/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Set Poppins as default for sans font
      },
      screens: {
        SideNavHide: "1000px",
        dashboardActiveheight:"1537px",
      },
    },
  },
  plugins: [],
};
