import * as monaco from 'monaco-editor'

// Dark Theme for MongoDB
export const mongodbCustomTheme = {
	base: 'vs-dark' as monaco.editor.BuiltinTheme,
	inherit: true,
	colors: {
		'editor.background': '#1e1e1e', // Dark background
		'editor.foreground': '#d4d4d4', // General foreground text
		'editorLineNumber.foreground': '#858585',
		'editorLineNumber.activeForeground': '#c6c6c6',
		'editor.selectionBackground': '#264f78',
		'editor.inactiveSelectionBackground': '#3a3d41',
		'editorCursor.foreground': '#d7ba7d',
	},
	rules: [
		{
			token: 'comment',
			foreground: '6a9955', // Soft green for comments
			fontStyle: 'italic',
		},
		{
			token: 'keyword',
			foreground: 'c586c0', // Purple for keywords
			fontStyle: 'bold',
		},
		{
			token: 'operator',
			foreground: '569cd6', // Blue for operators
		},
		{ token: 'operator.keyword', foreground: 'd4d4d4' },
		{
			token: 'field',
			foreground: '9cdcfe', // Cyan for fields
		},
		{
			token: 'string',
			foreground: 'ce9178', // Orange for strings
		},
		{
			token: 'number',
			foreground: 'b5cea8', // Light green for numbers
		},
		{
			token: 'objectId',
			foreground: '4ec9b0', // Teal for object IDs
		},
		{
			token: 'regexp',
			foreground: 'd16969', // Red for regular expressions
		},
		{
			token: 'delimiter',
			foreground: 'dcdcdc', // Light gray for delimiters
		},
	],
}

export default mongodbCustomTheme
