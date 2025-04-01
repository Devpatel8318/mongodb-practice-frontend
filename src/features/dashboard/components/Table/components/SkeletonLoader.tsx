const QuestionsListTableSkeletonLoader = () => (
	<>
		{[...Array(5)].map((_, index) => (
			<tr key={index} className="animate-pulse">
				<td className="h-px w-2/12 whitespace-nowrap px-6 py-3">
					<div className="h-4 w-12 rounded-full bg-gray-200"></div>
				</td>
				<td className="size-px w-8/12 whitespace-nowrap py-3 ps-6">
					<div className="h-4 w-3/4 rounded-full bg-gray-200"></div>
				</td>
				<td className="size-px w-2/12 whitespace-nowrap px-6 py-3">
					<div className="h-4 w-16 rounded-full bg-gray-200"></div>
				</td>
			</tr>
		))}
	</>
)

export default QuestionsListTableSkeletonLoader
