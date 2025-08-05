/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        SL: {
          DEFAULT: "#1D3557", // Tailwind's blue-500
          light: "#60A5FA", // Tailwind's blue-300
          dark: "#2563EB", // Tailwind's blue-700
        },
      },
      fontFamily: {
        SpaceMono: ["SpaceMono", "monospace"],
        WorkSans: ["WorkSans", "sans-serif"],
        WorkSansBold: ["WorkSansBold", "sans-serif"],
        WorkSansBlack: ["WorkSansBlack", "sans-serif"],
        WorkSansLight: ["WorkSansLight", "sans-serif"],
      },
    },
  },
  plugins: [],
};
