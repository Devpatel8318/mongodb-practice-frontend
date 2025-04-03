// mongodbFormatter.ts
// MongoDB query formatting function
const formatMongoDBQuery = (query: string): string => {
	try {
		// Special case for aggregation pipelines
		if (query.includes('.aggregate')) {
			return formatAggregationPipeline(query)
		}

		let formattedQuery = ''
		let indentLevel = 0
		let inString = false
		let inComment = false
		let lastChar = ''
		let buffer = ''

		// Process character by character
		for (let i = 0; i < query.length; i++) {
			const char = query[i]
			const nextChar = i < query.length - 1 ? query[i + 1] : ''

			// Handle comments
			if (char === '/' && nextChar === '/' && !inString) {
				inComment = true
				buffer += '// '
				i++ // Skip the second '/'
				continue
			}

			if (inComment) {
				if (char === '\n') {
					inComment = false
					formattedQuery +=
						buffer + '\n' + ' '.repeat(indentLevel * 2)
					buffer = ''
				} else {
					buffer += char
				}
				continue
			}

			// Handle multi-line comments (/* */)
			if (char === '/' && nextChar === '*' && !inString) {
				inComment = true
				buffer += '/* '
				i++ // Skip the '*'
				continue
			}

			if (inComment && char === '*' && nextChar === '/') {
				inComment = false
				buffer += ' */'
				i++ // Skip the '/'
				continue
			} else if (inComment) {
				buffer += char
				continue
			}

			// Handle string literals (to avoid formatting inside strings)
			if ((char === '"' || char === "'") && lastChar !== '\\') {
				inString = !inString
				buffer += char
				continue
			}

			if (inString) {
				buffer += char
			} else {
				// Handle opening braces, brackets, parentheses
				if (char === '{' || char === '[' || char === '(') {
					buffer += char

					// Check if this is an empty block
					let j = i + 1
					while (j < query.length && /\s/.test(query[j])) j++

					const matchingClose =
						char === '{' ? '}' : char === '[' ? ']' : ')'

					if (j < query.length && query[j] === matchingClose) {
						// Empty block, no newline needed
						buffer += matchingClose
						i = j // Skip to closing character
					} else {
						// Not empty, add newline and indent
						formattedQuery += buffer + '\n'
						indentLevel++
						buffer = ' '.repeat(indentLevel * 2)
					}
				}
				// Handle closing braces, brackets, parentheses
				else if (char === '}' || char === ']' || char === ')') {
					if (buffer.trim()) {
						formattedQuery += buffer + '\n'
					}
					indentLevel = Math.max(0, indentLevel - 1)
					buffer = ' '.repeat(indentLevel * 2) + char

					// Check if there's a comma after this
					if (nextChar === ',') {
						buffer += ','
						i++ // Skip the comma
						formattedQuery += buffer + '\n'
						buffer = ' '.repeat(indentLevel * 2)
					}
				}
				// Handle commas not after closing braces
				else if (char === ',' && ![')', '}', ']'].includes(lastChar)) {
					buffer += char
					formattedQuery += buffer + '\n'
					buffer = ' '.repeat(indentLevel * 2)
				}
				// Handle colons
				else if (char === ':') {
					buffer += ': '
					// Skip extra spaces after colons
					while (i + 1 < query.length && query[i + 1] === ' ') {
						i++
					}
				}
				// Handle newlines
				else if (char === '\n') {
					if (buffer.trim()) {
						formattedQuery += buffer + '\n'
						buffer = ' '.repeat(indentLevel * 2)
					}
				}
				// All other characters
				else {
					buffer += char
				}
			}

			lastChar = char
		}

		// Add any remaining buffer
		if (buffer.trim()) {
			formattedQuery += buffer
		}

		return formattedQuery
	} catch (error) {
		console.error('Error formatting MongoDB query:', error)
		return query // Return the original query if formatting fails
	}
}

// Special formatter for MongoDB aggregation pipelines
const formatAggregationPipeline = (query: string): string => {
	try {
		// Extract the collection name and pipeline stages
		const match = query.match(
			/db\.(\w+)\.aggregate\s*\(\s*\[([\s\S]*)\]\s*\)/
		)
		if (!match) return formatMongoDBQuery(query)

		const collection = match[1]
		const pipelineContent = match[2]

		// Split the pipeline into individual stages with their comments
		const stages: { comment: string; stage: string }[] = []
		let currentStage = ''
		let currentComment = ''
		let inString = false
		let inComment = false
		let braceCount = 0
		let inLineComment = false

		// Process the pipeline content character by character
		for (let i = 0; i < pipelineContent.length; i++) {
			const char = pipelineContent[i]
			const nextChar =
				i < pipelineContent.length - 1 ? pipelineContent[i + 1] : ''

			// Handle string literals
			if (
				(char === '"' || char === "'") &&
				(i === 0 || pipelineContent[i - 1] !== '\\')
			) {
				inString = !inString
			}

			if (!inString) {
				// Handle single-line comments
				if (
					char === '/' &&
					nextChar === '/' &&
					!inComment &&
					!inLineComment
				) {
					inLineComment = true
					currentComment += '// '
					i++ // Skip the second '/'
					continue
				}

				if (inLineComment) {
					if (char === '\n') {
						inLineComment = false
						currentComment += '\n  ' // Add proper indentation for the next line
					} else {
						currentComment += char
					}
					continue
				}

				// Handle multi-line comments
				if (
					char === '/' &&
					nextChar === '*' &&
					!inComment &&
					!inLineComment
				) {
					inComment = true
					currentComment += '/* '
					i++ // Skip the '*'
					continue
				}

				if (inComment) {
					if (char === '*' && nextChar === '/') {
						inComment = false
						currentComment += ' */\n  '
						i++ // Skip the '/'
					} else {
						currentComment += char
					}
					continue
				}

				// Track braces to identify stage boundaries
				if (char === '{') {
					braceCount++
					if (braceCount === 1 && currentStage === '') {
						// Start of a new stage
						currentStage += char
					} else {
						currentStage += char
					}
				} else if (char === '}') {
					braceCount--
					currentStage += char

					if (braceCount === 0) {
						// End of the current stage
						// Check if there's a comma after this
						let j = i + 1
						while (
							j < pipelineContent.length &&
							/\s/.test(pipelineContent[j])
						)
							j++

						if (
							j < pipelineContent.length &&
							pipelineContent[j] === ','
						) {
							// Include the comma in the current stage
							i = j // Skip to the comma
							currentStage += ','
						}

						// Store the stage and comment
						stages.push({
							comment: currentComment.trim(),
							stage: currentStage.trim(),
						})

						currentStage = ''
						currentComment = ''
					}
				} else if (braceCount > 0) {
					// Inside a stage
					currentStage += char
				} else if (!/\s/.test(char) && char !== ',') {
					// Non-whitespace, non-comma character outside of a stage
					// This could be a comment or the start of a stage
					currentStage += char
				}
			} else {
				// Inside a string literal
				if (braceCount > 0) {
					currentStage += char
				}
			}
		}

		// Format each stage
		const formattedStages = stages.map(({ comment, stage }) => {
			const formattedStage = formatStageContent(stage)
			if (comment) {
				return `  ${comment}\n  ${formattedStage}`
			}
			return `  ${formattedStage}`
		})

		// Build the final formatted pipeline
		return `db.${collection}.aggregate([\n${formattedStages.join(',\n')}\n])`
	} catch (error) {
		console.error('Error formatting aggregation pipeline:', error)
		return query // Return the original query if formatting fails
	}
}

// Helper function to format a single stage
const formatStageContent = (stage: string): string => {
	try {
		// Remove any leading/trailing commas
		stage = stage.replace(/^,+/, '').replace(/,+$/, '')

		// Keep the opening brace and operator on the same line
		const operatorMatch = stage.match(/^\s*{\s*(\$\w+)\s*:/)
		if (!operatorMatch) return stage

		const operator = operatorMatch[1]
		// Remove the operator part to format the rest
		const content = stage.replace(/^\s*{\s*\$\w+\s*:/, '{')

		// Format the content with proper indentation
		const formatted = formatJsonLikeContent(content)

		// Reconstruct with proper spacing
		return `{${operator}: ${formatted.trim().substring(1)}`
	} catch (error) {
		console.error('Error formatting stage:', error)
		return stage
	}
}

// Helper function to format JSON-like content with proper indentation
const formatJsonLikeContent = (content: string): string => {
	let result = ''
	let indentLevel = 0
	let inString = false
	let buffer = ''

	for (let i = 0; i < content.length; i++) {
		const char = content[i]

		// Handle string literals
		if (
			(char === '"' || char === "'") &&
			(i === 0 || content[i - 1] !== '\\')
		) {
			inString = !inString
			buffer += char
			continue
		}

		if (inString) {
			buffer += char
		} else {
			if (char === '{' || char === '[') {
				buffer += char

				// Check if this is an empty object/array
				let j = i + 1
				while (j < content.length && /\s/.test(content[j])) j++

				const closingChar = char === '{' ? '}' : ']'
				if (j < content.length && content[j] === closingChar) {
					// Empty object/array
					buffer += closingChar
					i = j
				} else {
					// Not empty, add newline and indent
					result += buffer + '\n'
					indentLevel++
					buffer = ' '.repeat(indentLevel * 2)
				}
			} else if (char === '}' || char === ']') {
				if (buffer.trim()) {
					result += buffer + '\n'
				}
				indentLevel = Math.max(0, indentLevel - 1)
				buffer = ' '.repeat(indentLevel * 2) + char
			} else if (char === ',') {
				buffer += char
				result += buffer + '\n'
				buffer = ' '.repeat(indentLevel * 2)
			} else if (char === ':') {
				buffer += ': '
				// Skip extra spaces
				while (i + 1 < content.length && content[i + 1] === ' ') i++
			} else if (char === '\n') {
				if (buffer.trim()) {
					result += buffer + '\n'
					buffer = ' '.repeat(indentLevel * 2)
				}
			} else {
				buffer += char
			}
		}
	}

	if (buffer.trim()) {
		result += buffer
	}

	return result
}

export default formatMongoDBQuery
