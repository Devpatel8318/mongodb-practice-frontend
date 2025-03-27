import { useRef, useEffect } from 'src/deps'

function useIsFirstRender() {
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
		}
	}, [])

	return isFirstRender.current
}

export default useIsFirstRender
