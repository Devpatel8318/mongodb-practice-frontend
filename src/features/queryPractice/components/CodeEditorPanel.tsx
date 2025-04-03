import Icons from 'src/assets/svg'
import CodeEditor from './codeEditor/CodeEditor'

const CodeEditorPanel = ({
	isMaximized,
	isCollapsed,
	onToggle,
	onMaximize,
}: {
	isMaximized: boolean
	isCollapsed?: boolean
	onToggle: () => void
	onMaximize: () => void
}) => {
	return (
		<div className="">
			{/* Custom code editor header */}
			<div className="flex items-center justify-between bg-gray-50 p-2">
				<div className="text-sm">Code Editor</div>
				<div className="flex gap-2">
					{!isMaximized && (
						<button
							onClick={onToggle}
							aria-label={isCollapsed ? 'Expand' : 'Collapse'}
						>
							{isCollapsed ? (
								<Icons.Images24.DownArrowPagination />
							) : (
								<Icons.Images24.UpArrowPagination />
							)}
						</button>
					)}
					<button
						onClick={onMaximize}
						aria-label={isMaximized ? 'Minimize' : 'Maximize'}
					>
						{isMaximized ? (
							<Icons.Images24.Minimize />
						) : (
							<Icons.Images24.Maximize />
						)}
					</button>
				</div>
			</div>

			{/* Content area */}
			<div className="grow">
				<CodeEditor />
			</div>
		</div>
	)
}

export default CodeEditorPanel
