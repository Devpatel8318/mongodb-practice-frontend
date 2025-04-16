import { memo } from 'react'
import { cn } from 'src/utils/cn'

import { CollapsedSections } from '../ProblemPracticePage'

const LeftCollapsedBar = memo(
	({ collapsedSections }: { collapsedSections: CollapsedSections }) => (
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
)
LeftCollapsedBar.displayName = 'LeftCollapsedBar'

export default LeftCollapsedBar
