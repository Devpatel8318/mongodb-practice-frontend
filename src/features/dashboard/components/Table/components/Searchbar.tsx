const Searchbar = ({
	search,
	setSearch,
}: {
	search: string
	setSearch: (value: string) => void
}) => {
	return (
		<div className="relative max-w-md grow">
			<input
				type="text"
				name="hs-as-table-product-review-search"
				className="block w-full rounded-lg border border-gray-200 px-3 py-2 ps-11 text-sm focus:outline-none"
				placeholder="Search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
				<svg
					className="size-4 shrink-0 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.3-4.3" />
				</svg>
			</div>
		</div>
	)
}

export default Searchbar
