// CodeEditorPanel.jsx
import { memo, useContext } from 'react'
import Icons from 'src/assets/svg'
import MongodbCodeEditor from 'src/components/mongodbCodeEditor/MongodbCodeEditor'
import Timer from 'src/components/Timer/Timer'
import { CodeContext } from 'src/contexts/codeContext/CodeContext'
import { codeEditorDefaultValue } from 'src/contexts/codeContext/CodeProvider'

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
			<Timer />
			<div className="flex gap-2">
				<button onClick={() => setCode(codeEditorDefaultValue)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#1f2937"
					>
						<path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" />
					</svg>
				</button>
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
					value={code}
					onQueryChange={(newCode) => setCode(newCode)}
					focusOnMount={isMaximized}
					handleCursorPositionChange={(newPosition) =>
						setCursorPosition(newPosition)
					}
					cursorPosition={cursorPosition}
					// handleOptionCommandEnterClick={handleSubmit}
				/>
			</div>
		</div>
	)
}

export default memo(CodeEditorPanel)
