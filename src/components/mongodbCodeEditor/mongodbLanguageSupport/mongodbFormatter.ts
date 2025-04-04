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

			// Handle line comments
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
				// Handle inline comments (on the same line as key-value pairs)
				else if (char === '/' && nextChar === '/') {
					buffer += ' //'
					i++ // Skip next '/'
					continue
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

// Improved aggregation pipeline formatting
const formatAggregationPipeline = (query: string): string => {
	try {
		// Extract collection name and pipeline content
		const match = query.match(
			/db\.(\w+)\.aggregate\s*\(\s*\[([\s\S]*)\]\s*\)/
		)
		if (!match) return formatMongoDBQuery(query)

		const collection = match[1]
		const pipelineContent = match[2]

		// Split pipeline into stages while preserving comments
		const stages = extractPipelineStages(pipelineContent)

		// Format each stage
		const formattedStages = stages.map(({ stage, comments }) => {
			const formattedStage = formatStage(stage)

			// Add stage comments at the beginning
			if (comments.length > 0) {
				return `${comments.map((c) => `  ${c}`).join('\n')}\n  ${formattedStage}`
			}

			return `  ${formattedStage}`
		})

		// Reconstruct the full query
		return `db.${collection}.aggregate([\n${formattedStages.join(',\n\n')}\n])`
	} catch (error) {
		console.error('Error formatting aggregation pipeline:', error)
		return query // Return the original query if formatting fails
	}
}

// Extract stages and preserve comments
const extractPipelineStages = (
	content: string
): { stage: string; comments: string[] }[] => {
	const stages: { stage: string; comments: string[] }[] = []
	let currentStage = ''
	let pendingComments: string[] = []
	let inString = false
	let inLineComment = false
	let inBlockComment = false
	let braceCount = 0
	let currentComment = ''

	const processedContent = content.replace(/\r\n/g, '\n') // Normalize line endings

	// Process content character by character
	for (let i = 0; i < processedContent.length; i++) {
		const char = processedContent[i]
		const nextChar =
			i < processedContent.length - 1 ? processedContent[i + 1] : ''
		const prevChar = i > 0 ? processedContent[i - 1] : ''

		// Handle strings
		if (
			(char === '"' || char === "'") &&
			prevChar !== '\\' &&
			!inLineComment &&
			!inBlockComment
		) {
			inString = !inString
		}

		if (!inString) {
			// Handle line comments
			if (
				char === '/' &&
				nextChar === '/' &&
				!inLineComment &&
				!inBlockComment
			) {
				inLineComment = true
				currentComment = '//'
				i++ // Skip next '/'
				continue
			}

			if (inLineComment) {
				if (char === '\n') {
					inLineComment = false
					pendingComments.push(currentComment.trim())
					currentComment = ''
				} else {
					currentComment += char
				}
				continue
			}

			// Handle block comments
			if (char === '/' && nextChar === '*' && !inBlockComment) {
				inBlockComment = true
				currentComment = '/*'
				i++ // Skip next '*'
				continue
			}

			if (inBlockComment) {
				if (char === '*' && nextChar === '/') {
					currentComment += '*/'
					inBlockComment = false
					pendingComments.push(currentComment.trim())
					currentComment = ''
					i++ // Skip next '/'
					continue
				} else {
					currentComment += char
				}
				continue
			}

			// Handle stage boundaries
			if (char === '{' && braceCount === 0) {
				braceCount++
				currentStage = '{'
			} else if (braceCount > 0) {
				if (char === '{') braceCount++
				else if (char === '}') braceCount--

				currentStage += char

				// End of stage
				if (braceCount === 0) {
					// Skip whitespace and check for comma
					let j = i + 1
					while (
						j < processedContent.length &&
						/\s/.test(processedContent[j])
					)
						j++

					// Include the comma if present
					if (
						j < processedContent.length &&
						processedContent[j] === ','
					) {
						currentStage += ','
						i = j // Move past the comma
					}

					// Store the stage with its comments
					stages.push({
						stage: currentStage.trim(),
						comments: [...pendingComments], // Clone the pending comments
					})

					// Reset for next stage
					currentStage = ''
					pendingComments = []
				}
			} else if (!/\s/.test(char) && char !== ',') {
				// Non-whitespace outside of stage and not a comma - probably part of a comment
				currentStage += char
			}
		} else {
			// In a string
			if (braceCount > 0) {
				currentStage += char
			}
		}
	}

	// Add any remaining stage
	if (currentStage.trim()) {
		stages.push({
			stage: currentStage.trim(),
			comments: pendingComments,
		})
	}

	return stages
}

// Format an individual stage
const formatStage = (stageStr: string): string => {
	try {
		// Remove trailing comma if present
		stageStr = stageStr.replace(/,\s*$/, '')

		// Handle empty or malformed stages
		if (!stageStr.startsWith('{') || !stageStr.endsWith('}')) {
			return stageStr
		}

		// Extract the stage operator ($match, $lookup, etc.)
		const operatorMatch = stageStr.match(/^\{\s*(\$\w+)\s*:/)
		if (!operatorMatch) return stageStr

		const operator = operatorMatch[1]
		const colonIndex = stageStr.indexOf(':')
		const valueStart = colonIndex + 1
		const valueEnd = stageStr.length - 1
		const valueStr = stageStr.substring(valueStart, valueEnd).trim()

		// Format the stage value based on its type
		const formattedValue = formatStageValue(valueStr)

		// Determine trailing comments if any
		const trailingCommentMatch = valueStr.match(/(.+?)(\s*\/\/\s*.+)$/)
		const trailingComment = trailingCommentMatch
			? trailingCommentMatch[2]
			: ''

		// Construct the formatted stage
		return `{\n    ${operator}: ${formattedValue}${trailingComment}\n  }`
	} catch (error) {
		console.error('Error formatting stage:', error)
		return stageStr
	}
}

// Format the value portion of a stage
const formatStageValue = (valueStr: string): string => {
	try {
		valueStr = valueStr.trim()

		// Handle simple values (not objects or arrays)
		if (!valueStr.startsWith('{') && !valueStr.startsWith('[')) {
			return valueStr
		}

		// Handle empty objects/arrays
		if (valueStr === '{}' || valueStr === '[]') {
			return valueStr
		}

		// Format objects
		if (valueStr.startsWith('{') && valueStr.endsWith('}')) {
			const innerContent = valueStr
				.substring(1, valueStr.length - 1)
				.trim()
			if (!innerContent) return '{}'

			// Parse and format the key-value pairs
			const pairs = parseKeyValuePairs(innerContent)
			const formattedPairs = pairs.map(({ key, value, comment }) => {
				// Format the value recursively
				const formattedValue = formatValueWithIndentation(value, 6)

				// Add the comment if present
				return comment
					? `${key}: ${formattedValue}, ${comment}`
					: `${key}: ${formattedValue}`
			})

			return `{\n      ${formattedPairs.join(',\n      ')}\n    }`
		}

		// Format arrays
		if (valueStr.startsWith('[') && valueStr.endsWith(']')) {
			const innerContent = valueStr
				.substring(1, valueStr.length - 1)
				.trim()
			if (!innerContent) return '[]'

			// Parse and format array items
			const items = parseArrayItems(innerContent)

			// For simple arrays, keep on one line
			if (
				items.length <= 3 &&
				!items.some(
					(item) =>
						(item.includes('{') && item.includes('}')) ||
						(item.includes('[') && item.includes(']'))
				)
			) {
				return `[${items.join(', ')}]`
			}

			// For complex arrays, format with newlines
			const formattedItems = items.map((item) =>
				formatValueWithIndentation(item, 6)
			)
			return `[\n      ${formattedItems.join(',\n      ')}\n    ]`
		}

		return valueStr
	} catch (error) {
		console.error('Error formatting stage value:', error)
		return valueStr
	}
}

// Parse key-value pairs from an object string, preserving comments
const parseKeyValuePairs = (
	content: string
): { key: string; value: string; comment: string }[] => {
	const pairs: { key: string; value: string; comment: string }[] = []
	let currentPair = ''
	let inString = false
	let braceCount = 0
	let bracketCount = 0
	let inComment = false

	// Process content character by character
	for (let i = 0; i < content.length; i++) {
		const char = content[i]
		const nextChar = i < content.length - 1 ? content[i + 1] : ''
		const prevChar = i > 0 ? content[i - 1] : ''

		// Handle strings
		if ((char === '"' || char === "'") && prevChar !== '\\' && !inComment) {
			inString = !inString
		}

		// Handle comments
		if (!inString && char === '/' && nextChar === '/') {
			inComment = true
		}

		if (inComment && char === '\n') {
			inComment = false
		}

		// Track nesting of braces and brackets
		if (!inString && !inComment) {
			if (char === '{') braceCount++
			else if (char === '}') braceCount--
			else if (char === '[') bracketCount++
			else if (char === ']') bracketCount--

			// Split on commas at the top level
			if (char === ',' && braceCount === 0 && bracketCount === 0) {
				processPair(currentPair.trim(), pairs)
				currentPair = ''
				continue
			}
		}

		currentPair += char
	}

	// Process the last pair if any
	if (currentPair.trim()) {
		processPair(currentPair.trim(), pairs)
	}

	return pairs
}

// Process an individual key-value pair
const processPair = (
	pair: string,
	pairs: { key: string; value: string; comment: string }[]
) => {
	// Check for inline comments
	const commentMatch = pair.match(/^(.*?)(\s*\/\/\s*.+)$/)
	const pairContent = commentMatch ? commentMatch[1].trim() : pair
	const comment = commentMatch ? commentMatch[2] : ''

	// Find the colon separator
	let colonIndex = -1
	let inString = false

	for (let i = 0; i < pairContent.length; i++) {
		const char = pairContent[i]
		const prevChar = i > 0 ? pairContent[i - 1] : ''

		if ((char === '"' || char === "'") && prevChar !== '\\') {
			inString = !inString
		}

		if (char === ':' && !inString) {
			colonIndex = i
			break
		}
	}

	if (colonIndex === -1) {
		// No valid key-value separator found
		pairs.push({ key: pairContent, value: '', comment })
		return
	}

	const key = pairContent.substring(0, colonIndex).trim()
	const value = pairContent.substring(colonIndex + 1).trim()

	pairs.push({ key, value, comment })
}

// Parse array items, respecting nesting and strings
const parseArrayItems = (content: string): string[] => {
	const items: string[] = []
	let currentItem = ''
	let inString = false
	let braceCount = 0
	let bracketCount = 0
	let inComment = false

	// Process content character by character
	for (let i = 0; i < content.length; i++) {
		const char = content[i]
		const nextChar = i < content.length - 1 ? content[i + 1] : ''
		const prevChar = i > 0 ? content[i - 1] : ''

		// Handle strings
		if ((char === '"' || char === "'") && prevChar !== '\\' && !inComment) {
			inString = !inString
		}

		// Handle comments
		if (!inString && char === '/' && nextChar === '/') {
			inComment = true
		}

		if (inComment && char === '\n') {
			inComment = false
		}

		// Track nesting
		if (!inString && !inComment) {
			if (char === '{') braceCount++
			else if (char === '}') braceCount--
			else if (char === '[') bracketCount++
			else if (char === ']') bracketCount--

			// Split on commas at the top level
			if (char === ',' && braceCount === 0 && bracketCount === 0) {
				items.push(currentItem.trim())
				currentItem = ''
				continue
			}
		}

		currentItem += char
	}

	// Add the last item
	if (currentItem.trim()) {
		items.push(currentItem.trim())
	}

	return items
}

// Format a value with specific indentation
const formatValueWithIndentation = (
	value: string,
	indentLevel: number
): string => {
	const indent = ' '.repeat(indentLevel)
	value = value.trim()

	// Simple values
	if (!value.includes('{') && !value.includes('[')) {
		return value
	}

	// Objects
	if (value.startsWith('{') && value.endsWith('}')) {
		const innerContent = value.substring(1, value.length - 1).trim()
		if (!innerContent) return '{}'

		const pairs = parseKeyValuePairs(innerContent)
		const formattedPairs = pairs.map(({ key, value, comment }) => {
			const formattedValue = formatValueWithIndentation(
				value,
				indentLevel + 2
			)
			return comment
				? `${key}: ${formattedValue}, ${comment}`
				: `${key}: ${formattedValue}`
		})

		const innerIndent = ' '.repeat(indentLevel - 2)
		return `{\n${indent}${formattedPairs.join(',\n' + indent)}\n${innerIndent}}`
	}

	// Arrays
	if (value.startsWith('[') && value.endsWith(']')) {
		const innerContent = value.substring(1, value.length - 1).trim()
		if (!innerContent) return '[]'

		const items = parseArrayItems(innerContent)

		// Simple array - keep on one line
		if (
			items.length <= 3 &&
			!items.some(
				(item) =>
					(item.includes('{') && item.includes('}')) ||
					(item.includes('[') && item.includes(']'))
			)
		) {
			return `[${items.join(', ')}]`
		}

		// Complex array with nested structures
		const formattedItems = items.map((item) =>
			formatValueWithIndentation(item, indentLevel + 2)
		)
		const innerIndent = ' '.repeat(indentLevel - 2)
		return `[\n${indent}${formattedItems.join(',\n' + indent)}\n${innerIndent}]`
	}

	return value
}

export default formatMongoDBQuery
