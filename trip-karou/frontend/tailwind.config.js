/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        volkhov: ['Volkhov', 'serif'],
        'theme': '#10b982',
      },
      // Add keyframes and animation configurations
      keyframes: {
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'slideLeft': 'slideLeft 0.5s ease-in-out',
        'slideRight': 'slideRight 0.5s ease-in-out',
        'fadeIn': 'fadeIn 0.5s ease-in-out'
      }
      // Your commented colors can stay here
      // colors: {
      //   transparent: 'transparent',
      //   current: 'currentColor',
      //   'white': '#ffffff',
      //   'purple': '#3f3cbb',
      //   'midnight': '#121063',
      //   'metal': '#565584',
      //   'tahiti': '#3ab7bf',
      //   'silver': '#ecebff',
      //   'bubble-gum': '#ff77e9',
      //   'bermuda': '#78dcca',
      //   'theme': '#10b982',
      // },
    },
  },
  plugins: [],
}