import Icons from 'src/assets/svg'

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
		<div className="flex h-full flex-col">
			{/* Custom code editor header */}
			<div className="flex items-center justify-between bg-gray-50 p-2">
				<h3>Code Editor</h3>
				<div className="flex space-x-2">
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
			<div className="grow p-4">Code editor content goes here</div>
		</div>
	)
}

export default CodeEditorPanel
