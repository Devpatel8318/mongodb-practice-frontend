const Searchbar = ({
	search,
	setSearch,
}: {
	search: string
	setSearch: (value: string) => void
}) => {
	return (
		<div className="relative grow max-w-md">
			<input
				type="text"
				name="hs-as-table-product-review-search"
				className="border py-2 px-3 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:outline-none"
				placeholder="Search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
				<svg
					className="shrink-0 size-4 text-gray-400"
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
