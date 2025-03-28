import js from '@eslint/js'
import * as typescript from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
	{
		ignores: [
			'**/node_modules/',
			'**/dist/',
			'**/build/',
			'**/.next/',
			'**/.eslintrc.cjs',
		],
	},
	{
		...js.configs.recommended,
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
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
		},
	},
	...typescript.configs.recommended.map((config) => ({
		...config,
		files: ['**/*.{ts,tsx}'],
	})),
	{
		files: ['**/*.{tsx,jsx}'],
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
		},
		settings: {
			react: {
				version: '18.0',
			},
		},
		languageOptions: {
			globals: {
				React: 'writable',
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			...reactPlugin.configs.recommended.rules,
			...reactHooksPlugin.configs.recommended.rules,
			'react/function-component-definition': [
				'warn',
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function',
				},
			],
			'react/jsx-no-useless-fragment': [
				'error',
				{ allowExpressions: true },
			],
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
		},
	},
]
