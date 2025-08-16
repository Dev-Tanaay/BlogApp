import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
   theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: '#1a202c',
              fontWeight: '800',
            },
            h2: {
              color: '#2d3748',
              fontWeight: '700',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              color: '#1a202c',
              backgroundColor: '#f7fafc',
              padding: '0.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'a:hover': {
              color: '#2b6cb0',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
