import React, { useRef, useState, useCallback } from 'react'
import {
	ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from 'react-resizable-panels'
import Icons from 'src/assets/svg'

// Improved type definitions
type SectionName = 'question' | 'codeEditor' | 'submission' | 'rightSection'
type SectionConfig = {
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
		// defaultSize: 5,
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

	const panelRefs = {
		question: useRef<ImperativePanelHandle>(null),
		codeEditor: useRef<ImperativePanelHandle>(null),
		submission: useRef<ImperativePanelHandle>(null),
		rightSection: useRef<ImperativePanelHandle>(null),
	}

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

	const maximizeSection = useCallback((section: SectionName) => {
		setMaximizedSection((current) => (current === section ? null : section))
	}, [])

	const renderSectionHeader = (section: SectionName) => {
		const { title } = SECTION_CONFIGS[section]
		const isMaximized = maximizedSection === section
		const isCollapsed = panelRefs[section].current?.isCollapsed()

		const getSectionToggleIcon = () => {
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
		}

		return (
			<div className="flex justify-between items-center p-2 bg-gray-50">
				<h3>{title}</h3>
				<div className="flex space-x-2">
					{!isMaximized && (
						<button onClick={() => toggleSection(section)}>
							{getSectionToggleIcon()}
						</button>
					)}
					<button onClick={() => maximizeSection(section)}>
						{isMaximized ? (
							<Icons.Images24.Minimize />
						) : (
							<Icons.Images24.Maximize />
						)}
					</button>
				</div>
			</div>
		)
	}

	const renderMaximizedContent = () => {
		if (!maximizedSection) return null

		const content = {
			question: (
				<div className="w-full h-full flex flex-col">
					{renderSectionHeader('question')}
					<div className="flex-grow p-4">Question content</div>
				</div>
			),
			codeEditor: (
				<div className="w-full h-full flex flex-col">
					{renderSectionHeader('codeEditor')}
					<div className="flex-grow p-4">Code editor content</div>
				</div>
			),
			submission: (
				<div className="w-full h-full flex flex-col">
					{renderSectionHeader('submission')}
					<div className="flex-grow p-4">Submission content</div>
				</div>
			),
			// Adding to ignore type error // no use
			rightSection: (
				<div className="w-full h-full flex flex-col">
					{renderSectionHeader('rightSection')}
					<div className="flex-grow p-4">Right section content</div>
				</div>
			),
		}[maximizedSection]

		return <div className="w-full h-full">{content}</div>
	}

	// If a section is maximized, render only that section
	if (maximizedSection) return renderMaximizedContent()

	return (
		<div className="h-full flex bg-gray-100">
			<PanelGroup direction="horizontal" className="rounded-lg">
				{/* Question Description */}
				<Panel
					defaultSize={SECTION_CONFIGS.question.defaultSize}
					minSize={SECTION_CONFIGS.question.minSize}
					collapsible={true}
					ref={panelRefs.question}
					onCollapse={() =>
						setCollapsedSections((prev) => ({
							...prev,
							question: true,
						}))
					}
					onExpand={() =>
						setCollapsedSections((prev) => ({
							...prev,
							question: false,
						}))
					}
					className="bg-white rounded-lg"
				>
					<div className="h-full flex flex-col">
						{renderSectionHeader('question')}
						<div className="flex-grow p-4">Question content</div>
					</div>
				</Panel>
				<div className="h-full bg-gray-200">
					<div
						className={`w-8 font-normal h-full flex items-center justify-center rounded-lg tracking-wider text-md bg-white ${collapsedSections.question ? '' : 'hidden'}`}
					>
						<span className="-rotate-90 ">Content</span>
					</div>
				</div>

				<PanelResizeHandle className="w-1.5 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full" />

				{/* Right Section */}
				<Panel
					minSize={SECTION_CONFIGS.rightSection.minSize}
					collapsedSize={SECTION_CONFIGS.rightSection.collapsedSize}
					collapsible={true}
					onCollapse={() =>
						setCollapsedSections((prev) => ({
							...prev,
							rightSection: true,
						}))
					}
					onExpand={() =>
						setCollapsedSections((prev) => ({
							...prev,
							rightSection: false,
						}))
					}
				>
					<PanelGroup direction="vertical" className="h-full">
						{/* Code Editor Panel */}
						<Panel
							className="bg-white rounded-lg"
							defaultSize={SECTION_CONFIGS.codeEditor.defaultSize}
							minSize={SECTION_CONFIGS.codeEditor.minSize}
							collapsedSize={
								SECTION_CONFIGS.codeEditor.collapsedSize
							}
							collapsible={true}
							ref={panelRefs.codeEditor}
							onCollapse={() =>
								setCollapsedSections((prev) => ({
									...prev,
									codeEditor: true,
								}))
							}
							onExpand={() =>
								setCollapsedSections((prev) => ({
									...prev,
									codeEditor: false,
								}))
							}
						>
							<div className="h-full flex flex-col">
								{renderSectionHeader('codeEditor')}
								<div className="flex-grow p-4">
									Code editor content
								</div>
							</div>
						</Panel>

						<PanelResizeHandle className="h-1.5 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full" />

						{/* Submission Panel */}
						<Panel
							className="bg-white rounded-lg"
							defaultSize={SECTION_CONFIGS.submission.defaultSize}
							minSize={SECTION_CONFIGS.submission.minSize}
							collapsible={true}
							collapsedSize={
								SECTION_CONFIGS.submission.collapsedSize
							}
							ref={panelRefs.submission}
							onCollapse={() =>
								setCollapsedSections((prev) => ({
									...prev,
									submission: true,
								}))
							}
							onExpand={() =>
								setCollapsedSections((prev) => ({
									...prev,
									submission: false,
								}))
							}
						>
							<div className="h-full flex flex-col">
								{renderSectionHeader('submission')}
								<div className="flex-grow p-4">
									Submission content
								</div>
							</div>
						</Panel>
					</PanelGroup>
				</Panel>

				<div className="h-full bg-gray-200 flex flex-col gap-2">
					<div
						className={`w-8 font-normal grow flex items-center justify-center rounded-lg tracking-wider text-md bg-white ${collapsedSections.rightSection ? '' : 'hidden'}`}
					>
						<span className="-rotate-90 text-nowrap">
							Code Editor
						</span>
					</div>
					<div
						className={`w-8 font-normal grow flex items-center justify-center rounded-lg tracking-wider text-md bg-white ${collapsedSections.rightSection ? '' : 'hidden'}`}
					>
						<span className="-rotate-90 ">Submission</span>
					</div>
				</div>
			</PanelGroup>
		</div>
	)
}

export default ResizableLayout
