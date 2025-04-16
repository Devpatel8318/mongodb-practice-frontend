import { memo } from 'react'
import { cn } from 'src/utils/cn'

import { CollapsedSections } from '../ProblemPracticePage'

const RightCollapsedBar = ({
	collapsedSections,
}: {
	collapsedSections: CollapsedSections
}) => (
	<div className="flex flex-col gap-2">
		<div
			className={cn(
				'flex w-8 grow items-center justify-center rounded-lg bg-white text-base font-normal tracking-wider',
				!collapsedSections.rightSection && 'hidden'
			)}
		>
			<span className="-rotate-90 text-nowrap">Code Editor</span>
		</div>
		<div
			className={cn(
				'flex w-8 grow items-center justify-center rounded-lg bg-white text-base font-normal tracking-wider',
				!collapsedSections.rightSection && 'hidden'
			)}
		>
			<span className="-rotate-90 text-nowrap">Submission</span>
		</div>
	</div>
)

export default memo(RightCollapsedBar)
