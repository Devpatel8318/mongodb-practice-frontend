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

export const mongodbCustomDarkTheme: monaco.editor.IStandaloneThemeData = {
	base: 'vs-dark',
	inherit: true,
	colors: {
		'editor.background': '#0f1c1c', // Dark MongoDB-like background
		'editor.foreground': '#ffffff',
		'editorLineNumber.foreground': '#5b7f7f',
		'editorLineNumber.activeForeground': '#ffffff',
		'editorCursor.foreground': '#00ffcc',
		'editor.selectionBackground': '#264f4f',
		'editor.inactiveSelectionBackground': '#1e3939',
	},

	rules: [
		{ token: 'comment', foreground: '6c8c8c', fontStyle: 'italic' }, // muted gray
		{ token: 'keyword', foreground: '4fc1ff', fontStyle: 'bold' }, // light blue
		{ token: 'operator', foreground: '3cb3ff' }, // cyan
		{ token: 'field', foreground: 'ff8c3f' }, // warm orange
		{ token: 'string', foreground: '7ee787' }, // green (like Mongo strings)
		{ token: 'number', foreground: 'd29b5e' }, // slightly orange-y
		{ token: 'objectId', foreground: '7ee787' }, // same green as string
		{ token: 'regexp', foreground: 'd16969' }, // light red for regex
		{ token: 'delimiter', foreground: 'c0c0c0' }, // light gray
	],
}
