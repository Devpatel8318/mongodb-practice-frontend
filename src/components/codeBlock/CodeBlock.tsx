import { React } from 'src/deps'

interface CodeBlockProps {
	children: React.ReactNode
	className?: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
	return (
		<span
			className={`whitespace-pre-wrap rounded-[5px] border bg-brand-lightest p-0.5 text-xs text-gray-600 ${className}`}
		>
			{children}
		</span>
	)
}

export default CodeBlock
