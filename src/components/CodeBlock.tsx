import React from 'react'

interface CodeBlockProps {
	children: React.ReactNode
	className?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
	return (
		<span
			className={`whitespace-pre-wrap rounded-[5px] border border-gray-300 bg-gray-50 p-0.5 text-xs text-gray-600 ${className}`}
		>
			{children}
		</span>
	)
}

export default CodeBlock
