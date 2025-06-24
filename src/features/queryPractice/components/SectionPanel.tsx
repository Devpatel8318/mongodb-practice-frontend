import React, { memo } from 'react'
import { Panel } from 'src/deps'

import { SECTION_CONFIGS, SectionName } from '../helper/sectionConfig'
import { PanelRefs } from '../ProblemPracticePage'

type SectionPanelProps = {
	sectionName: SectionName
	panelRef: PanelRefs[SectionName]
	collapsed: boolean
	onToggle: () => void
	onMaximize: () => void
	handlePanelStateChange: (section: SectionName, isCollapsed: boolean) => void
	children: React.ReactNode
}

const SectionPanel = ({
	sectionName,
	panelRef,
	collapsed,
	onToggle,
	onMaximize,
	handlePanelStateChange,
	children,
}: SectionPanelProps) => {
	const config = SECTION_CONFIGS[sectionName]

	return (
		<Panel
			ref={panelRef}
			defaultSize={config.defaultSize}
			minSize={config.minSize}
			collapsible={true}
			collapsedSize={config.collapsedSize}
			onCollapse={() => handlePanelStateChange(sectionName, true)}
			onExpand={() => handlePanelStateChange(sectionName, false)}
			className="rounded-lg bg-white"
		>
			{React.cloneElement(children as React.ReactElement, {
				isCollapsed: collapsed,
				isMaximized: false,
				onToggle,
				onMaximize,
			})}
		</Panel>
	)
}

export default memo(SectionPanel)
