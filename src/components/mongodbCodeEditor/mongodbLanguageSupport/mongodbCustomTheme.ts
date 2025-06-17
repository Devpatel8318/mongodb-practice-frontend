import * as monaco from 'monaco-editor'

const blue = '016ee9'
const green = '12824D'
const orange = 'd83713'
const pink = 'cc3887'
const black = '001e2b'
const gray = '6b7280'

// Light Theme for MongoDB
export const mongodbCustomLightTheme: monaco.editor.IStandaloneThemeData = {
	base: 'vs',
	inherit: true,
	colors: {
		// 'editor.background': '#f9fafb',
		'editor.background': '#ffffff',
		'editor.foreground': '#111827',
		'editorLineNumber.foreground': '#9ca3af',
		'editorLineNumber.activeForeground': '#111827',
		// 'editorCursor.foreground': '#c2410c',
		'editor.selectionBackground': '#dbeafe',
		'editor.inactiveSelectionBackground': '#e5e7eb',
	},
	rules: [
		{
			token: 'comment',
			foreground: gray,
			fontStyle: 'italic',
		},
		{ token: 'keyword', foreground: orange },
		{ token: 'newkeyword', foreground: pink },
		{ token: 'isoDate', foreground: blue },
		{ token: 'db', foreground: black },
		{ token: 'operator', foreground: orange },
		{ token: 'field', foreground: orange },
		{ token: 'string', foreground: green },
		{ token: 'number', foreground: blue },
		{ token: 'objectId', foreground: blue },
		{ token: 'regexp', foreground: blue },
		{ token: 'delimiter', foreground: gray },
		{ token: 'function', foreground: blue },
	],
}
