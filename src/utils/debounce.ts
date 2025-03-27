type Procedure = (...args: any[]) => void

const debounce = (delay: number, mainFunction: Procedure) => {
	let timeoutId: ReturnType<typeof setTimeout>

	const debouncedFn = function (...args: Parameters<Procedure>) {
		timeoutId && clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			mainFunction(...args)
		}, delay)
	}

	debouncedFn.cancel = () => timeoutId && clearTimeout(timeoutId)

	return debouncedFn
}

export default debounce
