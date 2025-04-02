type Procedure<T extends unknown[]> = (...args: T) => void

const debounce = <T extends unknown[]>(
	delay: number,
	mainFunction: Procedure<T>
) => {
	let timeoutId: ReturnType<typeof setTimeout>

	const debouncedFn = (...args: Parameters<Procedure<T>>) => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		timeoutId = setTimeout(() => {
			mainFunction(...args)
		}, delay)
	}

	debouncedFn.cancel = () => timeoutId && clearTimeout(timeoutId)

	return debouncedFn
}

export default debounce
