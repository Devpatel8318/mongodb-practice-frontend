// CodeEditorPanel.jsx
import { memo, useContext } from 'react'
import Icons from 'src/assets/svg'
import MongodbCodeEditor from 'src/components/mongodbCodeEditor/MongodbCodeEditor'
import { CodeContext } from 'src/contexts/codeContext/CodeContext'

const CodeEditorPanel = ({
	isMaximized,
	isCollapsed,
	onToggle,
	onMaximize,
	handleSubmit,
}: {
	isMaximized: boolean
	isCollapsed?: boolean
	onToggle: () => void
	onMaximize: () => void
	handleSubmit: () => void
}) => {
	const { code, setCode, cursorPosition, setCursorPosition } =
		useContext(CodeContext)

	const handleToggle = () => {
		onToggle()
	}

	const handleMaximize = () => {
		onMaximize()
	}

	const Header = () => (
		<div className="flex items-center justify-between bg-gray-50 p-2">
			<div className="text-sm">Code Editor</div>
			<div className="flex gap-2">
				{!isMaximized && (
					<button
						onClick={handleToggle}
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
					onClick={handleMaximize}
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

	return (
		<div className="">
			<Header />
			<div className="grow">
				<MongodbCodeEditor
					initialValue={code}
					onQueryChange={(newCode) => setCode(newCode)}
					focusOnMount={isMaximized}
					handleCursorPositionChange={(newPosition) =>
						setCursorPosition(newPosition)
					}
					cursorPosition={cursorPosition}
					handleOptionCommandEnterClick={handleSubmit}
				/>
			</div>
		</div>
	)
}

export default memo(CodeEditorPanel)
