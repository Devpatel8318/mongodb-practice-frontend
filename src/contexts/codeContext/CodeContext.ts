import { createContext, monaco } from 'src/deps'

export type CustomCursorPosition = monaco.Position | -1

export type CodeContextType = {
	code: string
	setCode: (newCode: string) => void
	cursorPosition: CustomCursorPosition
	setCursorPosition: (pos: monaco.Position) => void
}

export const CodeContext = createContext<CodeContextType>({
	code: '',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setCode: () => {},
	cursorPosition: -1,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setCursorPosition: () => {},
})
