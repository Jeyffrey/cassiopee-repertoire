import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: 'var(--white)',
        dark: 'var(--dark)',
      },
      fontSize: {
        'body-lg': 'var(--body-lg)',
        body: 'var(--body)',
        'body-sm': 'var(--body-sm)',
      },
    },
  },
  plugins: [],
};
export default config;
