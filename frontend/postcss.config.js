const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: ["./components/**/*.tsx", "./pages/**/*.tsx", "./pages/**/*.jsx", "./settings.ts"],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
  }
];
module.exports = {
  plugins: [
    "postcss-import",
    "tailwindcss",
    "autoprefixer",
    // purgecss
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};
