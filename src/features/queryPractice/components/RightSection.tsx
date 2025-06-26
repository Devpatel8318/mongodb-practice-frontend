import { memo, useCallback } from 'react'
import { Panel, PanelGroup, PanelResizeHandle } from 'src/deps'

import { SECTION_CONFIGS, SectionName } from '../helper/sectionConfig'
import CodeEditorPanel from '../panels/codeEditorPanel/CodeEditorPanel'
import SubmissionPanel from '../panels/submissionPanel/SubmissionPanel'
import { CollapsedSections, PanelRefs } from '../ProblemPracticePage'
import RightCollapsedBar from './RightCollapsedBar'
import SectionPanel from './SectionPanel'

const RightSection = ({
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
	const handleToggleCodeEditor = useCallback(
		() => createToggleHandler('codeEditor')(),
		[createToggleHandler]
	)
	const handleToggleSubmission = useCallback(
		() => createToggleHandler('submission')(),
		[createToggleHandler]
	)

	const handleMaximizeCodeEditor = useCallback(
		() => createMaximizeHandler('codeEditor')(),
		[createMaximizeHandler]
	)
	const handleMaximizeSubmission = useCallback(
		() => createMaximizeHandler('submission')(),
		[createMaximizeHandler]
	)

	return (
		<>
			<Panel
				minSize={SECTION_CONFIGS.rightSection.minSize}
				collapsible={true}
				ref={panelRefs.rightSection}
				onCollapse={() => handlePanelStateChange('rightSection', true)}
				onExpand={() => handlePanelStateChange('rightSection', false)}
			>
				<PanelGroup direction="vertical">
					<SectionPanel
						sectionName="codeEditor"
						panelRef={panelRefs.codeEditor}
						collapsed={collapsedSections.codeEditor}
						onToggle={handleToggleCodeEditor}
						onMaximize={handleMaximizeCodeEditor}
						handlePanelStateChange={handlePanelStateChange}
					>
						<CodeEditorPanel
							isMaximized={false}
							isCollapsed={collapsedSections.codeEditor}
							onToggle={handleToggleCodeEditor}
							onMaximize={handleMaximizeCodeEditor}
						/>
					</SectionPanel>
					<PanelResizeHandle className="h-1.5 rounded-full transition-colors hover:bg-brand-lighter" />
					<SectionPanel
						sectionName="submission"
						panelRef={panelRefs.submission}
						collapsed={collapsedSections.submission}
						onToggle={handleToggleSubmission}
						onMaximize={handleMaximizeSubmission}
						handlePanelStateChange={handlePanelStateChange}
					>
						<SubmissionPanel
							isMaximized={false}
							isCollapsed={collapsedSections.submission}
							onToggle={handleToggleSubmission}
							onMaximize={handleMaximizeSubmission}
						/>
					</SectionPanel>
				</PanelGroup>
			</Panel>
			<RightCollapsedBar collapsedSections={collapsedSections} />
		</>
	)
}

export default memo(RightSection)
