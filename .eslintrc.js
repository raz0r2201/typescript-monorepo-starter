const base = {

	env: {
		node: true,
		es6: true,
		browser: true,
		'jest/globals': true,
	},

	plugins: [
		"prettier",
		"import",
		"jest"
	],

	extends: [
		"airbnb-base",
		"prettier",
		"plugin:jest/all"
	],


	rules: {

		"prettier/prettier": "error",

		// jest
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
		"import/no-extraneous-dependencies": [
			"error",
			{
				devDependencies: false,
			}
		],

		// Enforce curly braces even for one liners.
		curly: ["error", "all"],
	}

}

module.exports = {

	...base,

	root: true,

	overrides: [

		/**
		 * @JS
		 */
		{
			...base,

			files: ['**/*.js'],

		},

		/**
		 * @TS
		 */
		{
			...base,

			files: ['**/*.ts', '**/*.tsx'],

			parser: "@typescript-eslint/parser",

			plugins: [
				...base.plugins,
				"@typescript-eslint"
			],

			settings: {
				...(base.settings ? base.settings : {}),
				"import/parsers": {
					"@typescript-eslint/parser": [".ts", ".tsx"],
				},
				"import/resolver": {
					// use <root>/tsconfig.json
					typescript: {},
				},
			},

			rules: {
				...(base.rules ? base.rules : {}),
				// ESLint doesn't understand interfaces yet and marks them as undefined.
				"no-undef": "off",

				// These core rules don't work well on TS code, use the ones from the plugin instead.
				"no-unused-vars": "off",
				"no-shadow": "off",
				"no-redeclare": "off",

				// This is noisy while refactoring.
				"@typescript-eslint/no-unused-vars": [
					"error",
					{
						// Allow `let { ignored, ...rest} = foo`.
						ignoreRestSiblings: true,
					},
				],

				// Allow `constructor(private foo: number) {}`
				"no-useless-constructor": "off",
				"no-empty-function": [
					"error",
					{
						allow: ["constructors"],
					},
				]
			},

			overrides: [
				...base.overrides
			]

		}


	],

}
