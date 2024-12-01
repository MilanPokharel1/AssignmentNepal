/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      screens: {
        SideNavHide: "1000px",
        SideNavHide2: "1159px",
        dashboardActiveheight: "1537px",
        tableHide: "1354px",
      },
    },
  },
  plugins: [],
};
