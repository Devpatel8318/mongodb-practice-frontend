import { Img, memo } from 'src/deps'

import Loader from '../Loader/Loader'

interface ImageProps {
	src: string | string[]
	fallback?: JSX.Element | null
}

const defaultImage = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="24px"
		viewBox="0 -960 960 960"
		width="24px"
		fill="#1f2937"
	>
		<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
	</svg>
)

const Image = ({ src, fallback }: ImageProps) => {
	return (
		<Img
			src={Array.isArray(src) ? src : [src]}
			loader={<Loader />}
			unloader={fallback || defaultImage}
		/>
	)
}

export default memo(Image)
