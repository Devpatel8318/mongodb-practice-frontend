import MonacoEditor, { loader, useMonaco } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { useEffect, useRef } from 'src/deps'

import { mongodbCompletion } from './mongodbLanguageSupport/mongodbCompletion'
import { mongodbCustomLightTheme } from './mongodbLanguageSupport/mongodbCustomTheme'
import mongodbDocumentSemantic from './mongodbLanguageSupport/mongodbDocumentSemantic'
import formatMongoDBQuery from './mongodbLanguageSupport/mongodbFormatter'
import mongodbLanguage from './mongodbLanguageSupport/mongodbLanguage'
import mongodbLanguageConfiguration from './mongodbLanguageSupport/mongodbLanguageConfiguration'

loader.config({ monaco })

interface MongodbCodeEditorProps {
	onQueryChange: (query: string) => void
	initialValue: string
	focusOnMount?: boolean
	handleCursorPositionChange: (position: monaco.Position) => void
	cursorPosition: monaco.Position | -1
	handleOptionCommandEnterClick?: () => void
}

const mongodbEditorOptions: monaco.editor.IStandaloneEditorConstructionOptions =
	{
		padding: {
			top: 10,
		},
		fontSize: 14,
		fontWeight: '200', // not working
		wordWrap: 'on',
		lineHeight: 20,
		fontFamily: 'Source Code Pro',
		minimap: { enabled: false },
		readOnly: false,
		scrollbar: {
			vertical: 'hidden',
			horizontal: 'hidden',
		},
		wrappingIndent: 'same',
		glyphMargin: false,
		renderLineHighlight: 'none',
		overviewRulerBorder: false,
		folding: true,
		rulers: [],
		roundedSelection: true,
		cursorBlinking: 'blink',
		cursorSmoothCaretAnimation: 'on',
		guides: {
			highlightActiveIndentation: true,
			indentation: true,
			highlightActiveBracketPair: true,
			bracketPairsHorizontal: 'active',
		},
		overviewRulerLanes: 0,
		lineNumbersMinChars: 3,
		lineDecorationsWidth: 1,
		renderWhitespace: 'none',
		stickyScroll: {
			enabled: false,
		},
	}

const MongodbCodeEditor = ({
	onQueryChange,
	initialValue,
	focusOnMount,
	handleCursorPositionChange,
	cursorPosition,
	handleOptionCommandEnterClick,
}: MongodbCodeEditorProps) => {
	const monacoNew = useMonaco()
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
	const disposablesRef = useRef<monaco.IDisposable[]>([])

	useEffect(() => {
		if (monacoNew) {
			// Register the MongoDB language, if not already registered
			monacoNew.languages.register({ id: 'mongodb' })
			monacoNew.editor.defineTheme(
				'mongodbCustomTheme',
				mongodbCustomLightTheme
			)
			monaco.languages.setLanguageConfiguration(
				'mongodb',
				mongodbLanguageConfiguration
			)
			monacoNew.languages.setMonarchTokensProvider(
				'mongodb',
				mongodbLanguage
			)

			// Register document semantic tokens provider
			const semanticTokensProvider =
				monacoNew.languages.registerDocumentSemanticTokensProvider(
					'mongodb',
					mongodbDocumentSemantic
				)
			disposablesRef.current.push(semanticTokensProvider)

			// Register the MongoDB completion item provider
			const completionProvider =
				monacoNew.languages.registerCompletionItemProvider(
					'mongodb',
					mongodbCompletion
				)
			disposablesRef.current.push(completionProvider)

			// Register document formatting provider
			const formattingProvider =
				monacoNew.languages.registerDocumentFormattingEditProvider(
					'mongodb',
					{
						provideDocumentFormattingEdits: (model) => {
							const originalText = model.getValue()
							const formattedText =
								formatMongoDBQuery(originalText)

							return [
								{
									range: model.getFullModelRange(),
									text: formattedText,
								},
							]
						},
					}
				)
			disposablesRef.current.push(formattingProvider)
		}

		// Single unified cleanup function for all disposables
		return () => {
			// Dispose all registered providers
			disposablesRef.current.forEach((disposable) => {
				if (disposable?.dispose) {
					disposable.dispose()
				}
			})
			disposablesRef.current = []

			// Dispose the editor
			if (editorRef.current) {
				editorRef.current.dispose()
				editorRef.current = null
			}
		}
	}, [monacoNew]) // Only run the effect when Monaco editor instance is available

	const handleEditorChange = (value: string | undefined) => {
		if (value !== undefined) {
			onQueryChange(value)
		}
	}

	const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
		editorRef.current = editor

		if (cursorPosition !== -1) {
			editor.setPosition(cursorPosition)
			editor.focus()
		}

		if (focusOnMount) {
			editor.focus()
		}

		editor.onDidChangeCursorPosition(() => {
			const position = editor.getPosition()
			if (position) {
				handleCursorPositionChange(position)
			}
		})

		if (onQueryChange) {
			onQueryChange(editor.getValue())
		}

		editor.addCommand(
			monaco.KeyMod.Alt | monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
			() => {
				if (handleOptionCommandEnterClick) {
					handleOptionCommandEnterClick()
				}
			}
		)
	}

	return (
		<MonacoEditor
			height="1500px"
			defaultLanguage="mongodb"
			defaultValue={initialValue}
			onChange={handleEditorChange}
			onMount={handleEditorMount}
			theme="mongodbCustomTheme"
			options={mongodbEditorOptions}
		/>
	)
}

export default MongodbCodeEditor
