/** @type {import('tailwindcss').Config} */
export default {
    // १. यसले रिएक्टका कुन-कुन फाइलमा स्टाइल लागू गर्ने भनेर खोज्छ
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