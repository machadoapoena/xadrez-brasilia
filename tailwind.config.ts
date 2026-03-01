import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        brand: ['Montserrat', 'sans-serif'],
        signature: ['Ms Madi', 'cursive'],
        arialBlack: ['Arial Black', 'Arial Bold', 'Gadget', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
