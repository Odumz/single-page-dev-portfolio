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
        'spdp-black': withOpacity('--color-spdp-black'),
        'spdp-green': withOpacity('--color-spdp-green'),
        'spdp-gray': withOpacity('--color-spdp-gray'),
        'spdp-ash': withOpacity('--color-spdp-ash')
      },
      cursor: {
        default: 'url(https://res.cloudinary.com/odumz/image/upload/v1717773833/projects/cursor_x4dlpf.png), default'
      },
      keyframes: {
        flyIn: {
          '0%': { transform: 'translateY(40px)' },
          '50%': { transform: 'translateY(0)' },
        },
        flyInSide: {
          '0%': { transform: 'translateX(40px)' },
          '50%': { transform: 'translateX(0)' },
        },
        flyOut: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        flyIn: 'flyIn 0.5s linear',
        flyInSide: 'flyInSide 0.5s linear',
        flyOut: 'flyOut 0.1s linear',
      }
    },
  },
  plugins: [],
}

