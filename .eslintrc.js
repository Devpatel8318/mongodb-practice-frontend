module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:tailwindcss/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: [
		'@typescript-eslint',
		'react',
		'react-hooks',
		'prefer-arrow-functions',
		'import',
		'simple-import-sort',
	],
	settings: {
		react: {
			version: '18.0',
		},
	},
	ignorePatterns: [
		'**/node_modules/',
		'**/dist/',
		'**/build/',
		'**/.next/',
		'**/.eslintrc.cjs',
	],
	rules: {
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
		'no-console': 'off',
		'import/prefer-default-export': 'off',
		'max-len': 'off',
		'react/function-component-definition': [
			'error',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
		'react/jsx-no-bind': [
			'error',
			{
				allowArrowFunctions: true,
				allowFunctions: true,
			},
		],
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off',
		'react/no-unescaped-entities': 'off',
		'react-hooks/exhaustive-deps': 'error', // ✅ Ensures useEffect dependencies are checked
		'prefer-arrow-functions/prefer-arrow-functions': [
			'error',
			{
				returnStyle: 'unchanged',
			},
		],
		'@typescript-eslint/no-empty-function': 'error',
		'sort-imports': 'off',
		'import/order': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
	},
}
