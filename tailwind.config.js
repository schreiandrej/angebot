module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
}
