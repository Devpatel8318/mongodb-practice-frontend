import { memo } from 'src/deps'

import { SectionName } from '../helper/sectionConfig'
import CodeEditorPanel from '../panels/codeEditorPanel/CodeEditorPanel'
import QuestionPanel from '../panels/questionPanel/QuestionPanel'
import SubmissionPanel from '../panels/submissionPanel/SubmissionPanel'

const RenderMaximizedSection = ({
	maximizedSection,
	toggleSection,
	maximizeSection,
}: {
	maximizedSection: SectionName
	toggleSection: (section: SectionName) => void
	maximizeSection: (section: SectionName) => void
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
				isCollapsed={false}
				// handleSubmit={handleSubmit}
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

export default memo(RenderMaximizedSection)
