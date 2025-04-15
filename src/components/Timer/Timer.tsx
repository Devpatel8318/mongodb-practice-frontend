import { useEffect, useState } from 'react'
import useLocalStorage from 'src/hooks/useLocalStorage'

const formatTimeUnit = (unit: number): string =>
	(unit + 0.1).toString().split('.')[0].padStart(2, '0')

const Timer = () => {
	const [secondsElapsed, setSecondsElapsed] = useState(0)
	const [isRunning, setIsRunning] = useState(false)

	const [
		localStorageStartTime,
		setLocalStorageStartTime,
		removeLocalStorageStartTime,
	] = useLocalStorage<number | null>('startTime', null)
	const [
		localStorageTimeElapsed,
		localStorageSetTimeElapsed,
		removeLocalStorageTimeElapsed,
	] = useLocalStorage<number>('timeElapsed', 0)

	useEffect(() => {
		console.log('localStorageStartTime', localStorageStartTime)

		if (localStorageStartTime) {
			// Timer was running before refresh
			const elapsed = Math.floor(
				(Date.now() - localStorageStartTime) / 1000
			)
			setSecondsElapsed(elapsed)
			setIsRunning(true)
		} else if (localStorageTimeElapsed) {
			// Timer was paused before refresh
			setSecondsElapsed(localStorageTimeElapsed)
			setIsRunning(false)
		}
	}, [localStorageStartTime, localStorageTimeElapsed])

	// Handle ticking
	useEffect(() => {
		if (!isRunning) return

		const interval = setInterval(() => {
			setSecondsElapsed((prev) => prev + 1)
		}, 1000)

		return () => clearInterval(interval)
	}, [isRunning])

	const handleSetIsRunning = () => {
		setIsRunning((prev) => {
			const newState = !prev

			if (newState) {
				// Resuming: calculate start time = now - secondsElapsed
				const newStart = Date.now() - secondsElapsed * 1000
				setLocalStorageStartTime(newStart)
				removeLocalStorageTimeElapsed()
			} else {
				// Pausing: store timeElapsed, remove startTime
				localStorageSetTimeElapsed(secondsElapsed)
				removeLocalStorageStartTime()
			}

			return newState
		})
	}

	const handleReset = () => {
		setSecondsElapsed(0)
		setIsRunning(false)
		removeLocalStorageStartTime()
		removeLocalStorageTimeElapsed()
	}

	const hours = Math.floor(secondsElapsed / 3600)
	const minutes = Math.floor((secondsElapsed % 3600) / 60)
	const seconds = secondsElapsed % 60

	return (
		<div className="flex flex-row items-center gap-3 font-mono text-sm text-gray-800">
			<button onClick={handleSetIsRunning}>
				{isRunning ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#1f2937"
					>
						<path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#1f2937"
					>
						<path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
					</svg>
				)}
			</button>
			<div>
				{formatTimeUnit(hours)}:{formatTimeUnit(minutes)}:
				{formatTimeUnit(seconds)}
			</div>
			<button onClick={handleReset}>
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
		</div>
	)
}

export default Timer
