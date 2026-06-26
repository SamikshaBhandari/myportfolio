/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                vintageBg: '#fcfaf2',
                vintageCard: '#ffffff',
                vintageCharcoal: '#1a1a1a',
                vintageSand: '#e0d8c3'
            }
        },
    },
    plugins: [],
}