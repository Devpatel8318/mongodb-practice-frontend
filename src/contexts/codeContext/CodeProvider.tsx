import { useState } from 'react'
import { CodeContext, CustomCursorPosition } from './CodeContext'

// TODO: change to "// Start coding here..."
const defaultValue = `db.posts.findOne(
  {
    title: "Post 202"
  }
)
 `
export const CodeProvider = ({ children }: { children: React.ReactNode }) => {
	const [code, setCode] = useState(defaultValue)
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
