import React, { memo } from 'react'

import { SectionName } from '../helper/sectionConfig'
import QuestionPanel from '../panels/questionPanel/QuestionPanel'
import { CollapsedSections, PanelRefs } from '../ProblemPracticePage'
import LeftCollapsedBar from './LeftCollapsedBar'
import SectionPanel from './SectionPanel'

const LeftSection = ({
	panelRefs,
	handlePanelStateChange,
	collapsedSections,
	createToggleHandler,
	createMaximizeHandler,
}: {
	panelRefs: PanelRefs
	handlePanelStateChange: (section: SectionName, isCollapsed: boolean) => void
	collapsedSections: CollapsedSections
	createToggleHandler: (sectionName: SectionName) => () => void
	createMaximizeHandler: (sectionName: SectionName) => () => void
}) => {
	const handleToggleQuestion = createToggleHandler('question')
	const handleMaximizeQuestion = createMaximizeHandler('question')

	return (
		<>
			<SectionPanel
				sectionName="question"
				panelRef={panelRefs.question}
				collapsed={collapsedSections.question}
				onToggle={handleToggleQuestion}
				onMaximize={handleMaximizeQuestion}
				handlePanelStateChange={handlePanelStateChange}
			>
				<QuestionPanel
					isMaximized={false}
					onToggle={handleToggleQuestion}
					onMaximize={handleMaximizeQuestion}
				/>
			</SectionPanel>
			<LeftCollapsedBar collapsedSections={collapsedSections} />
		</>
	)
}

export default memo(LeftSection)
