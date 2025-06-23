import { useEffect, useState } from 'react'
import Icons from 'src/assets/svg'
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
		if (localStorageStartTime) {
			const elapsed = Math.floor(
				(Date.now() - localStorageStartTime) / 1000
			)
			setSecondsElapsed(elapsed)
			setIsRunning(true)
		} else if (localStorageTimeElapsed > 0) {
			setSecondsElapsed(localStorageTimeElapsed)
			setIsRunning(false)
		}
		// run only once on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!isRunning) return

		const interval = setInterval(() => {
			if (localStorageStartTime) {
				const newElapsed = Math.floor(
					(Date.now() - localStorageStartTime) / 1000
				)
				setSecondsElapsed(newElapsed)
			}
		}, 1000)

		return () => clearInterval(interval)
	}, [isRunning, localStorageStartTime])

	const handleSetIsRunning = () => {
		setIsRunning((prev) => {
			const newState = !prev

			if (newState) {
				// Starting/Resuming: calculate start time = now - secondsElapsed
				const newStart = Date.now() - secondsElapsed * 1000
				setLocalStorageStartTime(newStart)
				removeLocalStorageTimeElapsed()
			} else {
				// Pausing: store current elapsed time, remove startTime
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
				{isRunning ? <Icons.Images24.Pause /> : <Icons.Images24.Play />}
			</button>
			<div>
				{formatTimeUnit(hours)}:{formatTimeUnit(minutes)}:
				{formatTimeUnit(seconds)}
			</div>
			<button onClick={handleReset}>
				<Icons.Images24.Reset />
			</button>
		</div>
	)
}

export default Timer
