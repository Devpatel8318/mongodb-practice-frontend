import { useEffect, useRef } from 'src/deps'
import MonacoEditor, { loader, Monaco, useMonaco } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { mongodbCompletion } from './editorConfig/mongodbCompletion'
import mongodbLanguage from './editorConfig/mongodbLanguage'
import mongodbDocumentSemantic from './editorConfig/mongodbDocumentSemantic'
import mongodbLanguageConfiguration from './editorConfig/mongodbLanguageConfiguration'
import { mongodbCustomLightTheme } from './editorConfig/mongodbCustomTheme'
import formatMongoDBQuery from './editorConfig/mongodbFormatter'

loader.config({ monaco })

interface EditorComponentProps {
	onQueryChange?: (query: string) => void
}

const defaultValue = `db.orders.aggregate( [
   // Stage 1: Filter pizza order documents by date range
   {
      $match:
      {
         "date": { $gte: new ISODate( "2020-01-30" ), $lt: new ISODate( "2022-01-30" ) }
      }
   },
   // Stage 2: Group remaining documents by date and calculate results
   {
      $group:
      {
         _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
         totalOrderValue: { $sum: { $multiply: [ "$price", "$quantity" ] } },
         averageOrderQuantity: { $avg: "$quantity" }
      }
   },
   // Stage 3: Sort documents by totalOrderValue in descending order
   {
      $sort: { totalOrderValue: -1 }
   }
 ] )
`

const EditorComponent: React.FC<EditorComponentProps> = ({ onQueryChange }) => {
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
		if (onQueryChange && value !== undefined) {
			onQueryChange(value)
		}
	}

	// Function to initialize the editor when Monaco has mounted
	const handleEditorMount = (
		editor: monaco.editor.IStandaloneCodeEditor,
		_monaco: Monaco
	) => {
		editorRef.current = editor

		if (onQueryChange) {
			onQueryChange(editor.getValue())
		}
	}

	return (
		<MonacoEditor
			height="1500px"
			defaultLanguage="mongodb"
			defaultValue={defaultValue}
			onChange={handleEditorChange}
			onMount={handleEditorMount}
			theme="mongodbCustomTheme"
			options={{
				minimap: { enabled: false },
				readOnly: false,
				scrollbar: {
					vertical: 'hidden',
					horizontal: 'hidden',
				},
				wordWrap: 'on',
				wrappingIndent: 'same',
				fontFamily: 'Source Code Pro',
				fontSize: 14,
				lineHeight: 20,
				glyphMargin: false,
				renderLineHighlight: 'none',
				overviewRulerBorder: false,
				folding: true,
				rulers: [],
				roundedSelection: true,
				cursorBlinking: 'blink',
				cursorSmoothCaretAnimation: 'on',
				padding: {
					top: 10,
				},
				fontWeight: '200',
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
			}}
		/>
	)
}

export default EditorComponent
