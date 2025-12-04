// Use the PostCSS plugin package for Tailwind to avoid runtime errors
// See: https://tailwindcss.com/docs/installation/postcss
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
