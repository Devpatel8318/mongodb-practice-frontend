import * as monaco from 'monaco-editor'
import mongodbSnippets from './mongodbSnippets.json'

interface Snippet {
	label: string
	insertText: string
	detail: string
}

export const mongodbCompletion = {
	provideCompletionItems: async (
		model: monaco.editor.ITextModel,
		position: monaco.Position
	) => {
		const word = model.getWordUntilPosition(position)
		const range = new monaco.Range(
			position.lineNumber,
			word.startColumn,
			position.lineNumber,
			word.endColumn
		)

		const suggestions: monaco.languages.CompletionItem[] = []

		// Add database commands
		mongodbSnippets.databaseCommands.forEach((command: Snippet) => {
			suggestions.push({
				label: command.label,
				kind: monaco.languages.CompletionItemKind.Method,
				insertText: command.insertText,
				insertTextRules:
					monaco.languages.CompletionItemInsertTextRule
						.InsertAsSnippet,
				detail: command.detail,
				range: range,
			})
		})

		// Add aggregation stages
		mongodbSnippets.aggregationStages.forEach((stage: Snippet) => {
			suggestions.push({
				label: stage.label,
				kind: monaco.languages.CompletionItemKind.Keyword,
				insertText: stage.insertText,
				insertTextRules:
					monaco.languages.CompletionItemInsertTextRule
						.InsertAsSnippet,
				detail: stage.detail,
				range: range,
			})
		})

		// Add operators
		mongodbSnippets.operators.forEach((operator: Snippet) => {
			suggestions.push({
				label: operator.label,
				kind: monaco.languages.CompletionItemKind.Operator,
				insertText: operator.insertText,
				insertTextRules:
					monaco.languages.CompletionItemInsertTextRule
						.InsertAsSnippet,
				detail: operator.detail,
				range: range,
			})
		})

		return { suggestions }
	},
}

export default mongodbCompletion
