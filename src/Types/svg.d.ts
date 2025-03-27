declare module '*.svg' {
	import { React } from 'src/deps'
	const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
	export { ReactComponent }
	export default ReactComponent
}
