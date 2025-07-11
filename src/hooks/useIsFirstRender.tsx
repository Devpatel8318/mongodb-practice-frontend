import { useEffect, useRef } from 'src/deps'

const useIsFirstRender = () => {
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
		}
	}, [])

	return isFirstRender.current
}

export default useIsFirstRender
