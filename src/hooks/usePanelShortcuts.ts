import { useEffect } from 'react'
import { SECTION_CONFIGS } from 'src/features/queryPractice/helper/sectionConfig'
import { PanelRefs } from 'src/features/queryPractice/ProblemPracticePage'

// hooks/usePanelShortcuts.ts
export const usePanelShortcuts = (panelRefs: PanelRefs) => {
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
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [panelRefs])
}

export default usePanelShortcuts
