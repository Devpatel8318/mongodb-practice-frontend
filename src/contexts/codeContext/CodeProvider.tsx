import { useState } from 'src/deps'

import { CodeContext, CustomCursorPosition } from './CodeContext'

export const codeEditorDefaultValue = '// Start coding here...'
export const CodeProvider = ({ children }: { children: React.ReactNode }) => {
	const [code, setCode] = useState(codeEditorDefaultValue)
	const [cursorPosition, setCursorPosition] =
		useState<CustomCursorPosition>(-1)

	return (
		<CodeContext.Provider
			value={{ code, setCode, cursorPosition, setCursorPosition }}
		>
			{children}
		</CodeContext.Provider>
	)
}
