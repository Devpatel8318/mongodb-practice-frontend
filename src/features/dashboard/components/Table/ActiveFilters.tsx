import Icons from 'src/assets/svg'

export type Filters = {
	status: {
		todo: boolean
		attempted: boolean
		solved: boolean
	}
	difficulty: {
		easy: boolean
		medium: boolean
		hard: boolean
	}
}

const ActiveFilters = ({
	filters,
	handleRemoveAppliedFilter,
}: {
	filters: Filters
	handleRemoveAppliedFilter: (
		parent: keyof Filters,
		child: keyof Filters[keyof Filters]
	) => void
}) => {
	// Get all active filters as flattened array of [parent, child] pairs
	const activeFilters = Object.entries(filters).flatMap(
		([parent, children]) =>
			Object.entries(children)
				.filter(([_, applied]) => applied)
				.map(([child]) => ({
					parent: parent as keyof Filters,
					child: child as keyof Filters[keyof Filters],
				}))
	)

	if (activeFilters.length === 0) return null

	return (
		<div className="mt-2 flex gap-2">
			{activeFilters.map(({ parent, child }) => (
				<div
					key={`${parent}-${child}`}
					className="flex items-center gap-1 rounded-lg border px-1.5 py-0.5 text-sm"
				>
					{child}
					<button
						onClick={() => handleRemoveAppliedFilter(parent, child)}
					>
						<Icons.Images16.Close />
					</button>
				</div>
			))}
		</div>
	)
}

export default ActiveFilters
