import { memo } from 'src/deps'
import { cn } from 'src/utils/cn'

import { CollapsedSections } from '../ProblemPracticePage'

const LeftCollapsedBar = ({
	collapsedSections,
}: {
	collapsedSections: CollapsedSections
}) => (
	<div className="">
		<div
			className={cn(
				'flex h-full w-8 items-center justify-center rounded-lg bg-white text-base font-normal tracking-wider',
				!collapsedSections.question && 'hidden'
			)}
		>
			<span className="-rotate-90">Content</span>
		</div>
	</div>
)

export default memo(LeftCollapsedBar)
