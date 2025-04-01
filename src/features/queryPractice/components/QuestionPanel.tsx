import Icons from 'src/assets/svg'

const QuestionPanel = ({
	isMaximized,
	onToggle,
	onMaximize,
}: {
	isMaximized: boolean
	onToggle: () => void
	onMaximize: () => void
}) => {
	return (
		<div className="flex h-full flex-col">
			{/* Custom question navigation header */}
			<div className="flex items-center justify-between bg-gray-50 p-2">
				<div className="flex gap-3">
					<button className="font-medium">Overview</button>
					<button className="font-medium">Examples</button>
					<button className="font-medium">Solutions</button>
					{/* Add more navigation buttons as needed */}
				</div>

				<div className="flex space-x-2">
					{!isMaximized && (
						<button onClick={onToggle} aria-label="Collapse">
							<Icons.Images24.LeftArrowPagination />
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
			<div className="grow p-4">Question content goes here</div>
		</div>
	)
}

export default QuestionPanel
