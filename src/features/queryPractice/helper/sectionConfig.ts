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
	defaultSize: 100 - (SECTION_CONFIGS.question.defaultSize || 0),
}

export { SECTION_CONFIGS, type SectionName }
