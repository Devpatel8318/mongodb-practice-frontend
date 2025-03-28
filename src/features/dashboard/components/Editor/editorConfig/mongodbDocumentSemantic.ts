import * as monaco from 'monaco-editor'

// Semantic Tokens Legend for MongoDB
const legend = {
	tokenTypes: [
		'comment',
		'string',
		'keyword',
		'number',
		'regexp',
		'operator',
		'field',
		'objectId',
		'delimiter',
	],
	tokenModifiers: [
		'declaration',
		'documentation',
		'readonly',
		'static',
		'abstract',
		'deprecated',
		'modification',
		'async',
	],
}

const getTypeIndex = (type: string) => legend.tokenTypes.indexOf(type)
const getModifierIndex = (modifiers: string | string[]) => {
	if (typeof modifiers === 'string') modifiers = [modifiers]
	return modifiers.reduce((acc, mod) => {
		const idx = legend.tokenModifiers.indexOf(mod)
		return idx > -1 ? acc | (1 << idx) : acc
	}, 0)
}

// Token pattern for MongoDB (handles `$`-prefixed operators, identifiers, and strings)
const tokenPattern = /(\$?[a-zA-Z_][\w\$]*)|(["'`][^"'`]*["'`])|(\d+(\.\d+)?)/g

// Updated MongoDB Semantic Token Provider
export const mongodbDocumentSemantic = {
	getLegend: () => legend,

	provideDocumentSemanticTokens: function (model: monaco.editor.ITextModel) {
		const lines = model.getLinesContent()
		const data: number[] = []

		let prevLine = 0,
			prevChar = 0

		lines.forEach((line, lineNumber) => {
			let match
			while ((match = tokenPattern.exec(line)) !== null) {
				const tokenValue = match[0]

				// Determine token type
				let tokenType
				if (
					tokenValue.startsWith('//') ||
					tokenValue.startsWith('/*')
				) {
					tokenType = 'comment'
				} else if (/^['"`].*['"`]$/.test(tokenValue)) {
					tokenType = 'string'
				} else if (/^\d+(\.\d+)?$/.test(tokenValue)) {
					tokenType = 'number'
				} else if (/^\$/.test(tokenValue)) {
					tokenType = 'operator'
				} else {
					tokenType = 'field' // Default to 'field' for identifiers
				}

				const typeIndex = getTypeIndex(tokenType)
				if (typeIndex === -1) continue

				// Token modifiers (optional)
				const modifiers = tokenValue.startsWith('_') ? ['readonly'] : []
				const modifierIndex = getModifierIndex(modifiers)

				// Push delta-encoded semantic token data
				data.push(
					lineNumber - prevLine,
					prevLine === lineNumber
						? match.index - prevChar
						: match.index,
					tokenValue.length,
					typeIndex,
					modifierIndex
				)

				prevLine = lineNumber
				prevChar = match.index
			}
		})

		return { data: new Uint32Array(data), resultId: undefined }
	},

	releaseDocumentSemanticTokens: () => {},
}

export default mongodbDocumentSemantic
