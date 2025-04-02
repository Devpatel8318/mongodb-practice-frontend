import React, { useRef, useState, useCallback } from 'react'
import {
	ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from 'react-resizable-panels'
import { cn } from 'src/utils/cn'
import QuestionPanel from './components/QuestionPanel'
import CodeEditorPanel from './components/CodeEditorPanel'
import SubmissionPanel from './components/SubmissionPanel'

// Improved type definitions
type SectionName = 'question' | 'codeEditor' | 'submission' | 'rightSection'

interface SectionConfig {
	defaultSize?: number
	minSize: number
	collapsedSize?: number
}

const SECTION_CONFIGS = {} as Record<SectionName, SectionConfig>

SECTION_CONFIGS.question = {
	defaultSize: 50,
	minSize: 16,
}

SECTION_CONFIGS.codeEditor = {
	defaultSize: 60,
	minSize: 20,
	collapsedSize: 5,
}

SECTION_CONFIGS.submission = {
	defaultSize: 100 - (SECTION_CONFIGS.codeEditor.defaultSize || 0),
	minSize: 20,
	collapsedSize: 5,
}

SECTION_CONFIGS.rightSection = {
	minSize: 15,
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

	// Keep useCallback for key interaction functions
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

	// Keep useCallback for key interaction functions
	const maximizeSection = useCallback((section: SectionName) => {
		setMaximizedSection((current) => (current === section ? null : section))
	}, [])

	// Convert to regular function
	function handlePanelStateChange(
		section: SectionName,
		isCollapsed: boolean
	) {
		setCollapsedSections((prev) => ({
			...prev,
			[section]: isCollapsed,
		}))
	}

	// Render maximized content if a section is maximized
	if (maximizedSection) {
		return (
			<div className="size-full bg-white">
				{maximizedSection === 'question' && (
					<QuestionPanel
						isMaximized={true}
						onToggle={() => toggleSection('question')}
						onMaximize={() => maximizeSection('question')}
					/>
				)}
				{maximizedSection === 'codeEditor' && (
					<CodeEditorPanel
						isMaximized={true}
						onToggle={() => toggleSection('codeEditor')}
						onMaximize={() => maximizeSection('codeEditor')}
					/>
				)}
				{maximizedSection === 'submission' && (
					<SubmissionPanel
						isMaximized={true}
						onToggle={() => toggleSection('submission')}
						onMaximize={() => maximizeSection('submission')}
					/>
				)}
			</div>
		)
	}

	return (
		<div className="flex h-full bg-gray-100">
			<PanelGroup direction="horizontal" className="h-full rounded-lg">
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
					{!collapsedSections.question && (
						<QuestionPanel
							isMaximized={false}
							onToggle={() => toggleSection('question')}
							onMaximize={() => maximizeSection('question')}
						/>
					)}
				</Panel>

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

				<PanelResizeHandle className="w-1.5 rounded-full bg-gray-100 transition-colors hover:bg-gray-200" />

				{/* Right Section */}
				<Panel
					minSize={SECTION_CONFIGS.rightSection.minSize}
					collapsible={true}
					ref={panelRefs.rightSection}
					onCollapse={() =>
						handlePanelStateChange('rightSection', true)
					}
					onExpand={() =>
						handlePanelStateChange('rightSection', false)
					}
				>
					<PanelGroup direction="vertical">
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
							<CodeEditorPanel
								isMaximized={false}
								isCollapsed={collapsedSections.codeEditor}
								onToggle={() => toggleSection('codeEditor')}
								onMaximize={() => maximizeSection('codeEditor')}
							/>
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
							<SubmissionPanel
								isMaximized={false}
								isCollapsed={collapsedSections.submission}
								onToggle={() => toggleSection('submission')}
								onMaximize={() => maximizeSection('submission')}
							/>
						</Panel>
					</PanelGroup>
				</Panel>

				<div className="flex flex-col gap-2">
					<div
						className={cn(
							'flex w-8 grow items-center justify-center rounded-lg bg-white text-base font-normal tracking-wider',
							!collapsedSections.rightSection && 'hidden'
						)}
					>
						<span className="-rotate-90 text-nowrap">
							Code Editor
						</span>
					</div>
					<div
						className={cn(
							'flex w-8 grow items-center justify-center rounded-lg bg-white text-base font-normal tracking-wider',
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
