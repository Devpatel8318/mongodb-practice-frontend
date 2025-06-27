import Icons from 'src/assets/svg'
import Button from 'src/features/auth/components/Button'

type SubmissionHeaderProps = {
	handleSubmit: () => string | void | null
	handleRun: () => string | void | null
	isMaximized: boolean
	isCollapsed?: boolean
	onToggle: () => void
	onMaximize: () => void
}

const SubmissionHeader = ({
	handleSubmit,
	handleRun,
	isMaximized,
	isCollapsed,
	onToggle,
	onMaximize,
}: SubmissionHeaderProps) => (
	<div className="flex items-center justify-between bg-brand-lightest px-2 py-1">
		<div className="text-sm">Submission</div>
		<div>
			<Button
				variant="outlineGray"
				size="xs"
				label="Run"
				dontShowFocusClasses={true}
				onClick={handleRun}
				className="mr-2"
				EndIcon={Icons.Images24.Run}
			/>
			<Button
				variant="success"
				size="sm"
				label="Submit"
				dontShowFocusClasses={true}
				onClick={handleSubmit}
			/>
		</div>
		<div className="flex gap-2">
			{!isMaximized && (
				<button
					onClick={onToggle}
					aria-label={isCollapsed ? 'Expand' : 'Collapse'}
				>
					{isCollapsed ? (
						<Icons.Images24.UpArrowPagination />
					) : (
						<Icons.Images24.DownArrowPagination />
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
)

export default SubmissionHeader
