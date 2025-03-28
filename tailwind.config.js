/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ed',
          100: '#dcedd5',
          200: '#b9dcac',
          300: '#91c47e',
          400: '#6aac51',
          500: '#357A21', // Main color
          600: '#2d6b1c',
          700: '#255516',
          800: '#1d4011',
          900: '#152c0c',
        }
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      }
    },
  },
  plugins: [],
  safelist: [
    // Primary Colors
    'bg-primary-50',
    'bg-primary-100',
    'bg-primary-500',
    'bg-primary-600',
    'text-primary-500',
    'text-primary-600',
    'border-primary-100',
    'border-primary-200',
    'hover:bg-primary-600',
    'hover:bg-primary-700',
    'focus:ring-primary-500',
    'focus:border-primary-500',
    'font-satoshi',
    // Workspace colors
    'bg-emerald-50',
    'bg-emerald-100',
    'text-emerald-600',
    'bg-amber-50',
    'bg-amber-100',
    'text-amber-600',
    'bg-sky-50',
    'bg-sky-100',
    'text-sky-600',
    // New Affinity Colors
    'bg-indigo-50',
    'bg-indigo-100',
    'bg-indigo-200',
    'text-indigo-600',
    'border-indigo-100',
    'border-indigo-200',
    'focus:ring-indigo-500',
    'bg-rose-50',
    'bg-rose-100',
    'bg-rose-200',
    'text-rose-600',
    'border-rose-100',
    'border-rose-200',
    'focus:ring-rose-500',
    'bg-violet-50',
    'bg-violet-100',
    'bg-violet-200',
    'text-violet-600',
    'border-violet-100',
    'border-violet-200',
    'focus:ring-violet-500',
    'bg-amber-50',
    'bg-amber-100',
    'bg-amber-200',
    'text-amber-600',
    'border-amber-100',
    'border-amber-200',
    'focus:ring-amber-500',
    // Dark mode classes
    'dark:bg-gray-800',
    'dark:bg-gray-900',
    'dark:text-gray-300',
    'dark:text-gray-400',
    'dark:border-gray-700',
    'dark:hover:bg-gray-700',
    'dark:hover:bg-gray-700/50',
    'dark:bg-primary-900/50',
    'dark:text-primary-400'
  ]
};