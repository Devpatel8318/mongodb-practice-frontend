import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from 'react-resizable-panels'
import { useNavigate } from 'react-router-dom'
import { CodeProvider } from 'src/contexts/codeContext/CodeProvider'
import useIsFirstRender from 'src/hooks/useIsFirstRender'
import usePanelShortcuts from 'src/hooks/usePanelShortcuts'
import { useAppSelector } from 'src/Store'
import { API_STATUS } from 'src/utils/callApi'
import getErrorMessageAndField from 'src/utils/getErrorMessageAndField'
import showToast from 'src/utils/showToast'

import LeftCollapsedBar from './components/LeftCollapsedBar'
import RenderMaximizedSection from './components/RenderMaximizedSection'
import RightCollapsedBar from './components/RightCollapsedBar'
import { SECTION_CONFIGS, SectionName } from './helper/sectionConfig'
import CodeEditorPanel from './panels/codeEditorPanel/CodeEditorPanel'
import QuestionPanel from './panels/questionPanel/QuestionPanel'
import SubmissionPanel from './panels/submissionPanel/SubmissionPanel'

export type CollapsedSections = Record<SectionName, boolean>
export type PanelRefs = {
	[section in SectionName]: React.RefObject<ImperativePanelHandle>
}

const ProblemPracticeContent: React.FC = () => {
	const [maximizedSection, setMaximizedSection] =
		useState<SectionName | null>(null)
	const [collapsedSections, setCollapsedSections] =
		useState<CollapsedSections>({
			question: false,
			codeEditor: false,
			submission: false,
			rightSection: false,
		})

	const isFirstRender = useIsFirstRender()
	const navigate = useNavigate()

	// Create refs for all panels
	const questionRef = useRef<ImperativePanelHandle>(null)
	const codeEditorRef = useRef<ImperativePanelHandle>(null)
	const submissionRef = useRef<ImperativePanelHandle>(null)
	const rightSectionRef = useRef<ImperativePanelHandle>(null)

	const panelRefs: PanelRefs = useMemo(
		() => ({
			question: questionRef,
			codeEditor: codeEditorRef,
			submission: submissionRef,
			rightSection: rightSectionRef,
		}),
		[]
	)

	const { error: questionPanelError, status } = useAppSelector(
		(store) => store.questionPanel
	)

	const toggleSection = useCallback(
		(section: SectionName) => {
			const panelRef = panelRefs[section].current
			if (!panelRef) return

			if (panelRef.isCollapsed()) {
				panelRef.resize(SECTION_CONFIGS[section].defaultSize ?? 0)
			} else {
				panelRef.collapse()
			}
		},
		[panelRefs]
	)

	const maximizeSection = useCallback((section: SectionName) => {
		setMaximizedSection((current) => (current === section ? null : section))
	}, [])

	const handlePanelStateChange = (
		section: SectionName,
		isCollapsed: boolean
	) => {
		setCollapsedSections((prev) => {
			const newState = {
				...prev,
				[section]: isCollapsed,
			}

			const isAnyValueDifferent = Object.entries(newState).find(
				([k, v]) => v !== prev[k as SectionName]
			)

			if (!isAnyValueDifferent?.length) {
				return prev
			}

			return {
				...prev,
				[section]: isCollapsed,
			}
		})
	}

	const createToggleHandler = useCallback(
		(id: SectionName) => () => toggleSection(id),
		[toggleSection]
	)

	const createMaximizeHandler = useCallback(
		(id: SectionName) => () => maximizeSection(id),
		[maximizeSection]
	)

	// Handlers for each section
	const handleToggleQuestion = createToggleHandler('question')
	const handleToggleCodeEditor = createToggleHandler('codeEditor')
	const handleToggleSubmission = createToggleHandler('submission')

	const handleMaximizeQuestion = createMaximizeHandler('question')
	const handleMaximizeCodeEditor = createMaximizeHandler('codeEditor')
	const handleMaximizeSubmission = createMaximizeHandler('submission')

	usePanelShortcuts(panelRefs)

	useEffect(() => {
		if (
			isFirstRender ||
			(status !== API_STATUS.REJECTED && !questionPanelError)
		) {
			return
		}

		const { message } = getErrorMessageAndField(questionPanelError)

		showToast('error', message)
		navigate('/')
	}, [status, navigate, isFirstRender, questionPanelError])

	return (
		<>
			{maximizedSection ? (
				<RenderMaximizedSection
					maximizedSection={maximizedSection}
					toggleSection={toggleSection}
					maximizeSection={maximizeSection}
					// handleSubmit={handleSubmit}
				/>
			) : (
				<div className="flex h-full bg-gray-100">
					<PanelGroup
						direction="horizontal"
						className="h-full rounded-lg"
					>
						{/* Question Description */}
						<Panel
							defaultSize={SECTION_CONFIGS.question.defaultSize}
							minSize={SECTION_CONFIGS.question.minSize}
							collapsible={true}
							ref={panelRefs.question}
							onCollapse={() =>
								handlePanelStateChange('question', true)
							}
							onExpand={() =>
								handlePanelStateChange('question', false)
							}
							className="rounded-lg bg-white"
						>
							{!collapsedSections.question && (
								<QuestionPanel
									isMaximized={false}
									onToggle={handleToggleQuestion}
									onMaximize={handleMaximizeQuestion}
								/>
							)}
						</Panel>

						<LeftCollapsedBar
							collapsedSections={collapsedSections}
						/>
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
									defaultSize={
										SECTION_CONFIGS.codeEditor.defaultSize
									}
									minSize={SECTION_CONFIGS.codeEditor.minSize}
									collapsedSize={
										SECTION_CONFIGS.codeEditor.collapsedSize
									}
									collapsible={true}
									ref={panelRefs.codeEditor}
									onCollapse={() =>
										handlePanelStateChange(
											'codeEditor',
											true
										)
									}
									onExpand={() =>
										handlePanelStateChange(
											'codeEditor',
											false
										)
									}
								>
									<CodeEditorPanel
										isMaximized={false}
										isCollapsed={
											collapsedSections.codeEditor
										}
										onToggle={handleToggleCodeEditor}
										onMaximize={handleMaximizeCodeEditor}
									/>
								</Panel>

								<PanelResizeHandle className="h-1.5 rounded-full bg-gray-100 transition-colors hover:bg-gray-200" />

								{/* Submission Panel */}
								<Panel
									className="rounded-lg bg-white"
									defaultSize={
										SECTION_CONFIGS.submission.defaultSize
									}
									minSize={SECTION_CONFIGS.submission.minSize}
									collapsible={true}
									collapsedSize={
										SECTION_CONFIGS.submission.collapsedSize
									}
									ref={panelRefs.submission}
									onCollapse={() =>
										handlePanelStateChange(
											'submission',
											true
										)
									}
									onExpand={() =>
										handlePanelStateChange(
											'submission',
											false
										)
									}
								>
									<SubmissionPanel
										isMaximized={false}
										isCollapsed={
											collapsedSections.submission
										}
										onToggle={handleToggleSubmission}
										onMaximize={handleMaximizeSubmission}
									/>
								</Panel>
							</PanelGroup>
						</Panel>

						<RightCollapsedBar
							collapsedSections={collapsedSections}
						/>
					</PanelGroup>
				</div>
			)}
		</>
	)
}

const ProblemPracticePage = () => {
	return (
		<CodeProvider>
			<ProblemPracticeContent />
		</CodeProvider>
	)
}

export default ProblemPracticePage
