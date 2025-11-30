/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ktPrimary: "#f8fafc",
        ktCard: "#ffffff",
        ktBorder: "#e5e7eb",
        ktText: "#111827",
        ktMuted: "#6b7280",
        ktAccent: "#f59e0b",
        ktGreen: "#22c55e",
        ktDanger: "#ef4444",
      },
      borderRadius: {
        xl: "18px",
      },
    },
  },
  plugins: [],
};

