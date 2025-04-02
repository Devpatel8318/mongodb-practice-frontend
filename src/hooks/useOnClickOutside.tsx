import { useEffect, RefObject } from 'src/deps'

const useOnClickOutside = <T,>(
	ref: RefObject<T | null>,
	callback: (argument: MouseEvent | TouchEvent) => void
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent | TouchEvent) => {
			if (
				ref.current instanceof HTMLElement &&
				!ref.current.contains(event.target as Node)
			) {
				callback(event)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		// document.addEventListener('click', handleClickOutside);
		document.addEventListener('touchstart', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('touchstart', handleClickOutside)
		}
	}, [callback, ref])
}

export default useOnClickOutside
