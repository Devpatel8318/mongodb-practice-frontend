import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	ImperativePanelHandle,
	PanelGroup,
	PanelResizeHandle,
} from 'react-resizable-panels'
import { CodeProvider } from 'src/contexts/codeContext/CodeProvider'
import { useNavigate } from 'src/deps'
import useIsFirstRender from 'src/hooks/useIsFirstRender'
import usePanelShortcuts from 'src/hooks/usePanelShortcuts'
import { useAppSelector } from 'src/Store'
import { API_STATUS } from 'src/utils/callApi'
import getErrorMessageAndField from 'src/utils/getErrorMessageAndField'
import showToast from 'src/utils/showToast'

import LeftSection from './components/LeftSection'
import RenderMaximizedSection from './components/RenderMaximizedSection'
import RightSection from './components/RightSection'
import { SECTION_CONFIGS, SectionName } from './helper/sectionConfig'

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

	const handlePanelStateChange = useCallback(
		(section: SectionName, isCollapsed: boolean) => {
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
		},
		[]
	)

	const createToggleHandler = useCallback(
		(id: SectionName) => () => toggleSection(id),
		[toggleSection]
	)

	const createMaximizeHandler = useCallback(
		(id: SectionName) => () => maximizeSection(id),
		[maximizeSection]
	)

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
				/>
			) : (
				<div className="flex h-full">
					<PanelGroup
						direction="horizontal"
						className="h-full rounded-lg"
					>
						<LeftSection
							panelRefs={panelRefs}
							handlePanelStateChange={handlePanelStateChange}
							collapsedSections={collapsedSections}
							createToggleHandler={createToggleHandler}
							createMaximizeHandler={createMaximizeHandler}
						/>

						<PanelResizeHandle className="w-1.5 rounded-full transition-colors hover:bg-brand-lighter" />

						<RightSection
							panelRefs={panelRefs}
							handlePanelStateChange={handlePanelStateChange}
							collapsedSections={collapsedSections}
							createToggleHandler={createToggleHandler}
							createMaximizeHandler={createMaximizeHandler}
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
