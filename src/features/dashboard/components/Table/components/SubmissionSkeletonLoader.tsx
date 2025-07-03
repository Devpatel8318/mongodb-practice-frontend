const SubmissionSkeletonLoader = () => (
	<div className="space-y-4">
		<div className="ml-2 h-4 w-2/12 rounded-full bg-brand-lighter"></div>
		{[...Array(2)].map((_, index) => (
			<div
				key={index}
				className="animate-pulse rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
			>
				<div className="mb-2 h-4 w-1/4 rounded-full bg-brand-lighter"></div>
				<div className="mb-2 h-4 w-3/4 rounded-full bg-brand-lighter"></div>
				<div className="mb-2 h-4 w-1/2 rounded-full bg-brand-lighter"></div>
				<div className="mb-2 h-4 w-2/3 rounded-full bg-brand-lighter"></div>
				<div className="h-4 w-1/3 rounded-full bg-brand-lighter"></div>
			</div>
		))}
	</div>
)

export default SubmissionSkeletonLoader
