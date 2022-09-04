const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  daisyui: {
    themes: [
      {
        dark: {
          primary: '#137cb5',
          secondary: '#e80d52',
          accent: '#f4cd73',
          neutral: '#303030',
          'base-100': '#1c1c1c',
          info: '#35B0F3',
          success: '#1B743C',
          warning: '#F38A12',
          error: '#F2215C',
        },
      },
    ],
  },
  plugins: [forms, typography, daisyui],
};

module.exports = config;
