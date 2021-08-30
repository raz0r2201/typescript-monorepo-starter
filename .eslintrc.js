const common = {
  env: {
    node: true,
    es6: true,
    'jest/globals': true,
  },
  plugins: ['prettier', 'jest'],
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:jest/all'
  ],
  rules: {
    'prettier/prettier': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'jest/expect-expect': 'off',
    'jest/prefer-expect-assertions': 'off',
    'jest/no-test-return-statement': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-console': 'off',
    'no-iterator': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'consistent-return': 'off',
    'no-shadow': 'off',
    'no-unused-vars': 'off',
  },
}

module.exports = {
  // ...common,
  root: true,
  overrides: [
    {
      /*
      eslint-plugin-markdown only finds javascript code block snippet.
      For specific spec, refer to https://github.com/eslint/eslint-plugin-markdown
      */
      ...common,
      files: ['**/*.js'],
    },
    {
      ...common,
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      env: common.env,
      plugins: [...common.plugins, '@typescript-eslint'],
      extends: [
        ...common.extends,
        'plugin:@typescript-eslint/recommended',
	// vll ? plugin:@typescript-eslint/recommended-requiring-type-checking
	'plugin:@typescript-eslint/recommended-requiring-type-checking',

        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
      ],
      rules: {
        ...common.rules,
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
      settings: {
        'import/resolver': {
          typescript: {},
        },
      },
    },
  ],
}
