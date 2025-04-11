import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import {
	ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle,
} from 'react-resizable-panels'
import { useNavigate, useParams } from 'react-router-dom'
import { CodeContext } from 'src/contexts/codeContext/CodeContext'
import { CodeProvider } from 'src/contexts/codeContext/CodeProvider'
import useIsFirstRender from 'src/hooks/useIsFirstRender'
import { useAppSelector } from 'src/Store'
import { setSelectedQuestionIdDispatcher } from 'src/Store/reducers/problemPracticePage.reducer'
import { API_STATUS } from 'src/utils/callApi'
import { cn } from 'src/utils/cn'
import getErrorMessageAndField from 'src/utils/getErrorMessageAndField'
import showToast from 'src/utils/showToast'

import { SECTION_CONFIGS, SectionName } from './helper/sectionConfig'
import CodeEditorPanel from './panels/codeEditorPanel/CodeEditorPanel'
import QuestionPanel from './panels/questionDescriptionPanel/QuestionPanel'
import { submitAnswerActionDispatcher } from './panels/submissionPanel/submission.actions'
import SubmissionPanel from './panels/submissionPanel/SubmissionPanel'
import { fetchQuestionDetailActionDispatcher } from './problemPracticePage.actions'

const RenderMaximizedSection = ({
	maximizedSection,
	toggleSection,
	maximizeSection,
	handleSubmit,
}: {
	maximizedSection: SectionName
	toggleSection: (section: SectionName) => void
	maximizeSection: (section: SectionName) => void
	handleSubmit: () => void
}) => (
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
				// handleSubmit={handleSubmit}
			/>
		)}
		{maximizedSection === 'submission' && (
			<SubmissionPanel
				isMaximized={true}
				onToggle={() => toggleSection('submission')}
				onMaximize={() => maximizeSection('submission')}
				handleSubmit={handleSubmit}
			/>
		)}
	</div>
)

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

type CollapsedSections = Record<SectionName, boolean>

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
	const params = useParams()
	const navigate = useNavigate()
	const { questionId } = params

	// Create refs for all panels
	const panelRefs = {
		question: useRef<ImperativePanelHandle>(null),
		codeEditor: useRef<ImperativePanelHandle>(null),
		submission: useRef<ImperativePanelHandle>(null),
		rightSection: useRef<ImperativePanelHandle>(null),
	}

	const {
		error: problemPracticePageError,
		status,
		selectedQuestionId,
	} = useAppSelector((store) => store.problemPracticePage)

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

	const { code } = useContext(CodeContext)
	const { socketId } = useAppSelector((store) => store.socket)

	const validate = (): string | false => {
		if (!code) return 'code editor can not be empty'

		return false
	}

	const handleSubmit = () => {
		const validatorResponse = validate()

		if (validatorResponse) return showToast('error', validatorResponse)

		if (!selectedQuestionId) {
			console.error('selectedQuestionId not found', selectedQuestionId)
			showToast('error', 'Something went wrong')
			return navigate('/')
		}

		submitAnswerActionDispatcher({
			questionId: selectedQuestionId,
			answer: code,
			socketId,
		})
	}

	// Add keyboard shortcut support
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
			const isCommand = isMac ? event.metaKey : event.ctrlKey

			if (isCommand && event.key === '[') {
				event.preventDefault()
				if (panelRefs.question.current?.isCollapsed()) {
					panelRefs.question.current?.resize(
						SECTION_CONFIGS['question'].defaultSize ?? 0
					)
				} else {
					panelRefs.question.current?.collapse()
				}
			} else if (isCommand && event.key === ']') {
				event.preventDefault()
				if (panelRefs.rightSection.current?.isCollapsed()) {
					panelRefs.rightSection.current?.resize(
						SECTION_CONFIGS['rightSection'].defaultSize ?? 0
					)
				} else {
					panelRefs.rightSection.current?.collapse()
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (questionId) {
			// when page is refreshed, redux will be empty so, if params contains questionId then set this to redux
			if (!selectedQuestionId) {
				setSelectedQuestionIdDispatcher(+questionId)
			}
			fetchQuestionDetailActionDispatcher(+questionId)
		} else {
			// something went wrong
			navigate('/')
		}
	}, [questionId, navigate, selectedQuestionId])

	useEffect(() => {
		if (
			isFirstRender ||
			(status !== API_STATUS.REJECTED && !problemPracticePageError)
		) {
			return
		}

		const { message } = getErrorMessageAndField(problemPracticePageError)

		showToast('error', message)
		navigate('/')
	}, [status, navigate, isFirstRender, problemPracticePageError])

	return (
		<>
			{maximizedSection ? (
				<RenderMaximizedSection
					maximizedSection={maximizedSection}
					toggleSection={toggleSection}
					maximizeSection={maximizeSection}
					handleSubmit={handleSubmit}
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
									onToggle={() => toggleSection('question')}
									onMaximize={() =>
										maximizeSection('question')
									}
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
										onToggle={() =>
											toggleSection('codeEditor')
										}
										onMaximize={() =>
											maximizeSection('codeEditor')
										}
										// handleSubmit={handleSubmit}
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
										handleSubmit={handleSubmit}
										isMaximized={false}
										isCollapsed={
											collapsedSections.submission
										}
										onToggle={() =>
											toggleSection('submission')
										}
										onMaximize={() =>
											maximizeSection('submission')
										}
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
