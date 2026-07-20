/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: '#faf9f6',
        ink: '#1a1a1a',
        accent: '#003366'
      },
      fontFamily: {
        serif: ['Georgia', '"Computer Modern Serif"', 'ui-serif', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
};
