/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !==undefined) {
      return `hsla(var(${variableName}), ${opacityValue})`
    }
    return `hsl(var(${variableName}))`
  }
}

export default {
  darkMode: "class", // or 'media' or 'class'
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-spdp-black': withOpacity('--color-spdp-black'),
        'color-spdp-green': withOpacity('--color-spdp-green'),
        'color-spdp-gray': withOpacity('--color-spdp-gray'),
        'color-spdp-ash': withOpacity('--color-spdp-ash')
      },
    },
  },
  plugins: [],
}

