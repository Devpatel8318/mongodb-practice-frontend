import React, { useRef, useState, useCallback } from 'react'
import {
	ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from 'react-resizable-panels'
import Icons from 'src/assets/svg'
import { cn } from 'src/utils/cn'

// Improved type definitions
type SectionName = 'question' | 'codeEditor' | 'submission' | 'rightSection'

interface SectionConfig {
	title: string
	defaultSize?: number
	minSize: number
	collapsedSize?: number
}

const SECTION_CONFIGS: Record<SectionName, SectionConfig> = {
	question: {
		title: 'Question Description',
		defaultSize: 35,
		minSize: 16,
	},
	codeEditor: {
		title: 'Code Editor',
		defaultSize: 60,
		minSize: 20,
		collapsedSize: 5,
	},
	submission: {
		title: 'Submission',
		defaultSize: 40,
		minSize: 20,
		collapsedSize: 5,
	},
	rightSection: {
		title: 'rightSection',
		minSize: 15,
		collapsedSize: 0,
	},
}

const ResizableLayout: React.FC = () => {
	const [maximizedSection, setMaximizedSection] =
		useState<SectionName | null>(null)
	const [collapsedSections, setCollapsedSections] = useState<
		Record<SectionName, boolean>
	>({
		question: false,
		codeEditor: false,
		submission: false,
		rightSection: false,
	})

	// Create refs for all panels
	const panelRefs = {
		question: useRef<ImperativePanelHandle>(null),
		codeEditor: useRef<ImperativePanelHandle>(null),
		submission: useRef<ImperativePanelHandle>(null),
		rightSection: useRef<ImperativePanelHandle>(null),
	}

	// Toggle panel collapse state
	const toggleSection = useCallback((section: SectionName) => {
		const panelRef = panelRefs[section].current
		if (!panelRef) return

		if (panelRef.isCollapsed()) {
			panelRef.resize(SECTION_CONFIGS[section].defaultSize ?? 0)
		} else {
			panelRef.collapse()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Toggle maximized state for a section
	const maximizeSection = useCallback((section: SectionName) => {
		setMaximizedSection((current) => (current === section ? null : section))
	}, [])

	// Update collapsed state when panels change
	const handlePanelStateChange = useCallback(
		(section: SectionName, isCollapsed: boolean) => {
			setCollapsedSections((prev) => ({
				...prev,
				[section]: isCollapsed,
			}))
		},
		[]
	)

	// Get the appropriate toggle icon based on section and state
	const getSectionToggleIcon = useCallback(
		(section: SectionName, isCollapsed?: boolean) => {
			if (section === 'question') {
				return <Icons.Images24.LeftArrowPagination />
			}

			if (section === 'codeEditor') {
				return isCollapsed ? (
					<Icons.Images24.DownArrowPagination />
				) : (
					<Icons.Images24.UpArrowPagination />
				)
			}

			return isCollapsed ? (
				<Icons.Images24.UpArrowPagination />
			) : (
				<Icons.Images24.DownArrowPagination />
			)
		},
		[]
	)

	// Section header component
	const SectionHeader = useCallback(
		({ section }: { section: SectionName }) => {
			const { title } = SECTION_CONFIGS[section]
			const isMaximized = maximizedSection === section
			const isCollapsed = panelRefs[section].current?.isCollapsed()

			return (
				<div className="flex items-center justify-between bg-gray-50 p-2">
					<h3>{title}</h3>
					<div className="flex space-x-2">
						{!isMaximized && (
							<button
								onClick={() => toggleSection(section)}
								aria-label={isCollapsed ? 'Expand' : 'Collapse'}
							>
								{getSectionToggleIcon(section, isCollapsed)}
							</button>
						)}
						<button
							onClick={() => maximizeSection(section)}
							aria-label={isMaximized ? 'Minimize' : 'Maximize'}
						>
							{isMaximized ? (
								<Icons.Images24.Minimize />
							) : (
								<Icons.Images24.Maximize />
							)}
						</button>
					</div>
				</div>
			)
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[maximizedSection, getSectionToggleIcon, toggleSection, maximizeSection]
	)

	// Section content component
	const SectionContent = useCallback(
		({
			section,
			children,
		}: {
			section: SectionName
			children?: React.ReactNode
		}) => {
			return (
				<div className="flex h-full flex-col">
					<SectionHeader section={section} />
					<div className="grow p-4">
						{children || `${section} content`}
					</div>
				</div>
			)
		},
		[SectionHeader]
	)

	// Render maximized content if a section is maximized
	if (maximizedSection) {
		return (
			<div className="size-full">
				<SectionContent section={maximizedSection} />
			</div>
		)
	}

	return (
		<div className="flex h-full bg-gray-100">
			<PanelGroup direction="horizontal" className="rounded-lg">
				{/* Question Description */}
				<Panel
					defaultSize={SECTION_CONFIGS.question.defaultSize}
					minSize={SECTION_CONFIGS.question.minSize}
					collapsible={true}
					ref={panelRefs.question}
					onCollapse={() => handlePanelStateChange('question', true)}
					onExpand={() => handlePanelStateChange('question', false)}
					className="rounded-lg bg-white"
				>
					<SectionContent section="question" />
				</Panel>

				<div className="h-full">
					<div
						className={cn(
							'text-md flex h-full w-8 items-center justify-center rounded-lg bg-white font-normal tracking-wider',
							!collapsedSections.question && 'hidden'
						)}
					>
						<span className="-rotate-90">Content</span>
					</div>
				</div>

				<PanelResizeHandle className="w-1.5 rounded-full bg-gray-100 transition-colors hover:bg-gray-200" />

				{/* Right Section */}
				<Panel
					minSize={SECTION_CONFIGS.rightSection.minSize}
					collapsedSize={SECTION_CONFIGS.rightSection.collapsedSize}
					collapsible={true}
					ref={panelRefs.rightSection}
					onCollapse={() =>
						handlePanelStateChange('rightSection', true)
					}
					onExpand={() =>
						handlePanelStateChange('rightSection', false)
					}
				>
					<PanelGroup direction="vertical" className="h-full">
						{/* Code Editor Panel */}
						<Panel
							className="rounded-lg bg-white"
							defaultSize={SECTION_CONFIGS.codeEditor.defaultSize}
							minSize={SECTION_CONFIGS.codeEditor.minSize}
							collapsedSize={
								SECTION_CONFIGS.codeEditor.collapsedSize
							}
							collapsible={true}
							ref={panelRefs.codeEditor}
							onCollapse={() =>
								handlePanelStateChange('codeEditor', true)
							}
							onExpand={() =>
								handlePanelStateChange('codeEditor', false)
							}
						>
							<SectionContent section="codeEditor" />
						</Panel>

						<PanelResizeHandle className="h-1.5 rounded-full bg-gray-100 transition-colors hover:bg-gray-200" />

						{/* Submission Panel */}
						<Panel
							className="rounded-lg bg-white"
							defaultSize={SECTION_CONFIGS.submission.defaultSize}
							minSize={SECTION_CONFIGS.submission.minSize}
							collapsible={true}
							collapsedSize={
								SECTION_CONFIGS.submission.collapsedSize
							}
							ref={panelRefs.submission}
							onCollapse={() =>
								handlePanelStateChange('submission', true)
							}
							onExpand={() =>
								handlePanelStateChange('submission', false)
							}
						>
							<SectionContent section="submission" />
						</Panel>
					</PanelGroup>
				</Panel>

				<div className="flex h-full flex-col gap-2">
					<div
						className={cn(
							'text-md flex w-8 grow items-center justify-center rounded-lg bg-white font-normal tracking-wider',
							!collapsedSections.rightSection && 'hidden'
						)}
					>
						<span className="-rotate-90 text-nowrap">
							Code Editor
						</span>
					</div>
					<div
						className={cn(
							'text-md flex w-8 grow items-center justify-center rounded-lg bg-white font-normal tracking-wider',
							!collapsedSections.rightSection && 'hidden'
						)}
					>
						<span className="-rotate-90 text-nowrap">
							Submission
						</span>
					</div>
				</div>
			</PanelGroup>
		</div>
	)
}

export default ResizableLayout
