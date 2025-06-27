import { memo } from 'src/deps'

const JsonView = memo(
	({ children }: { children: React.ReactNode | object }) => {
		const data =
			typeof children === 'string'
				? children
				: JSON.stringify(children, null, 4)

		return (
			<pre className="w-fit rounded-md bg-brand-bg p-2 pr-3 text-xs font-thin">
				{data}
			</pre>
		)
	}
)

JsonView.displayName = 'JsonView'
export default JsonView
