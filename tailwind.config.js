/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2E5CD5',
          gold: '#E89C28',
        },
        background: '#F8F9FA',
        card: '#FFFFFF',
        text: {
          primary: '#1E1E1E',
          secondary: '#6B7280',
          hint: '#9CA3AF',
        },
        input: {
          border: '#E5E7EB',
          focus: '#2E5CD5',
          fill: '#F9FAFB',
        },
        success: '#10B981',
        error: '#EF4444',
        divider: '#E5E7EB',
      },
    },
  },
  plugins: [],
}
