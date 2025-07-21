/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#081536',      // azul oscuro
                secondary: '#303747',    // gris azulado
                accent: '#F24C3D',       // rojo coral
                highlight: '#F7CA40',    // amarillo
                paper: '#F3F3F5',        // blanco
            },
        },
    },
    plugins: [],
}; 