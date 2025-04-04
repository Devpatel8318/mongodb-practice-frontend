// CodeEditorPanel.jsx
import { memo, useEffect, useRef } from 'react'
import * as monaco from 'monaco-editor'
import { useAppSelector } from 'src/Store'
import Icons from 'src/assets/svg'
import { updateCodeDispatcher } from '../problemPracticePage.actions'
import MongodbCodeEditor from 'src/components/mongodbCodeEditor/MongodbCodeEditor'

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
	const { code, cursorPosition } = useAppSelector(
		(store) => store.problemPracticePage
	)

	const localCodeRef = useRef<string>(code || '')
	const handleLocalCodeChange = (newCode: string) => {
		localCodeRef.current = newCode
	}

	const localCursorPosition = useRef<monaco.Position | -1>(cursorPosition)
	const handleCursorPositionChange = (position: monaco.Position) => {
		localCursorPosition.current = position
	}

	useEffect(() => {
		if (code !== localCodeRef.current) {
			handleLocalCodeChange(code || '')
		}
		if (cursorPosition !== localCursorPosition.current) {
			localCursorPosition.current = cursorPosition
		}
		// only want to update the local code and cursorPosition when the code or cursorPosition from the store changes
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [code, cursorPosition])

	const syncLocalDataToRedux = () => {
		updateCodeDispatcher(localCodeRef.current, localCursorPosition.current)
	}

	const handleToggle = () => {
		syncLocalDataToRedux()
		onToggle()
	}

	const handleMaximize = () => {
		syncLocalDataToRedux()
		onMaximize()
	}

	useEffect(() => {
		return () => {
			syncLocalDataToRedux()
		}
	}, [])

	return (
		<div className="">
			{/* Custom code editor header */}
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

			{/* Content area */}
			<div className="grow">
				<MongodbCodeEditor
					initialValue={localCodeRef.current}
					onQueryChange={handleLocalCodeChange}
					focusOnMount={isMaximized}
					handleCursorPositionChange={handleCursorPositionChange}
					cursorPosition={cursorPosition}
				/>
			</div>
		</div>
	)
}

export default memo(CodeEditorPanel)
