const QuestionsListTableSkeletonLoader = () => (
    <>
        {[...Array(5)].map((_, index) => (
            <tr key={index} className="animate-pulse">
                <td className="h-px whitespace-nowrap w-1/12 px-6 py-3">
                    <div className="w-12 h-4 bg-gray-200 rounded-full"></div>
                </td>
                <td className="size-px whitespace-nowrap w-9/12 ps-6 py-3">
                    <div className="w-3/4 h-4 bg-gray-200 rounded-full"></div>
                </td>
                <td className="size-px whitespace-nowrap w-2/12 px-6 py-3">
                    <div className="w-16 h-4 bg-gray-200 rounded-full"></div>
                </td>
            </tr>
        ))}
    </>
);

export default QuestionsListTableSkeletonLoader;
