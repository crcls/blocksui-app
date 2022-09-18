module.exports = {
  plugins: {
    autoprefixer: {},
    tailwindcss: {},
    'postcss-focus-visible': {
      replaceWith: '[data-focus-visible-added]',
    },
  },
}
