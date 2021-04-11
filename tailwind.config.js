module.exports = {
  mode: 'jit',
  purge: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        base: 'var(--color-background-base)',
        accent: 'var(--color-background-accent)',
      },
      textColor: {
        base: 'var(--color-text-base)',
        inverted: 'var(--color-text-inverted)',
        hover: 'var(--color-text-hover)',
        heading: 'var(--color-text-heading)',
      },
      borderColor: {
        base: 'var(--color-border-base)',
        hover: 'var(--color-border-hover)',
        active: 'var(--color-border-active))',
      },
      ringColor: {
        base: 'var(--color-ring-base)',
        hover: 'var(--color-ring-hover)',
        active: 'var(--color-ring-active)',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
}
