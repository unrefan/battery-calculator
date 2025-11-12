import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        surface: {
          light: '#f9fafb',
          DEFAULT: '#f3f4f6',
          dark: '#0f172a',
        },
        ink: {
          light: '#0f172a',
          muted: '#475569',
          inverted: '#f8fafc',
        },
        primary: {
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
        },
        focus: '#3b82f6',
        accent: '#f97316',
        high: '#ffd447',
      },
      boxShadow: {
        focus: '0 0 0 3px rgba(14,165,233,0.45)',
      },
    },
  },
  plugins: [forms],
}
