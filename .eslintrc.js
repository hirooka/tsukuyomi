module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off'
  },
  // I DON'T KNOW WHY.
  // Parsing error: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
  // https://github.com/vuejs/eslint-plugin-vue/issues/1343
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: false
    }
  }
}
