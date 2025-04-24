import React, { useState } from 'react'
import { tryCatchSync } from 'src/utils/tryCatch'

type DatabaseSchema = {
	title: string
	query: string // Query is stored as a string
}

type FormData = {
	question: string
	description: string
	answer: string
	collection: string
	validCollections: string[]
	difficulty: number
	status: 'TODO' | 'SOLVED' | 'ATTEMPTED'
	dataBaseSchema: DatabaseSchema[]
}

const initialFormData: FormData = {
	question: "Get single post with title 'Post 202'",
	description:
		"You are given a posts collection in a MongoDB database. Your task is to write a query to find one post with title 'Post 202'",
	answer: 'db.posts.findOne({"title":"Post 202"})',
	collection: 'posts',
	validCollections: ['posts'],
	difficulty: 1,
	status: 'TODO',
	dataBaseSchema: [
		{
			title: 'Posts Collection (posts)',
			query: 'db.posts.findOne({})',
		},
	],
}

const Temp: React.FC = () => {
	const [formData, setFormData] = useState<FormData>(initialFormData)
	const [output, setOutput] = useState<string>('')
	const [showOutput, setShowOutput] = useState<boolean>(false)

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const value = e.target.value
		setFormData({
			...formData,
			[e.target.name]: value,
		})
	}

	const handleValidCollectionsChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value
		const validCollections = value.split(',').map((item) => item.trim())
		setFormData({
			...formData,
			validCollections,
		})
	}

	const handleDatabaseSchemaChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const value = e.target.value
		const newDataBaseSchema = [...formData.dataBaseSchema]
		newDataBaseSchema[index].query = value // Update query as string
		setFormData({
			...formData,
			dataBaseSchema: newDataBaseSchema,
		})
	}

	const handleAddSchema = () => {
		setFormData({
			...formData,
			dataBaseSchema: [
				...formData.dataBaseSchema,
				{
					title: '',
					query: '',
				},
			],
		})
	}

	const handleRemoveSchema = (index: number) => {
		const newDataBaseSchema = formData.dataBaseSchema.filter(
			(_, i) => i !== index
		)
		setFormData({
			...formData,
			dataBaseSchema: newDataBaseSchema,
		})
	}

	// Function to extract collection, queryType, and queryFilter from a query string
	const extractQueryData = (query: string) => {
		const answerPattern = /db\.(\w+)\.(\w+)\((.*)\)/
		const matches = query.match(answerPattern)

		let collection = ''
		let queryType = 'findOne' // Default to 'findOne'
		let queryFilter = {}

		if (matches && matches.length > 2) {
			collection = matches[1]
			queryType = matches[2]

			const [, error] = tryCatchSync(() => {
				// Try to parse the filter from the query
				const filterText = matches[3]
				if (filterText) {
					queryFilter = JSON.parse(filterText)
				}
			})

			if (error) {
				console.error('Error parsing query filter:', error)
			}
		}

		return { collection, queryType, queryFilter }
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault() // Prevent page reload on form submit

		// Extract collection, queryType, and queryFilter from the 'answer' input
		const { collection, queryType, queryFilter } = extractQueryData(
			formData.answer
		)

		// Process the schema entries and extract collection, queryType, and queryFilter for each one
		const processedSchema = formData.dataBaseSchema.map((schema) => {
			const {
				collection: schemaCollection,
				queryType: schemaQueryType,
				queryFilter: schemaQueryFilter,
			} = extractQueryData(schema.query)
			return {
				title: schema.title,
				query: {
					collection: schemaCollection,
					queryType: schemaQueryType,
					queryFilter: schemaQueryFilter,
				},
			}
		})

		// Prepare the JSON data
		const jsonData = {
			question: formData.question,
			description: formData.description,
			answer: formData.answer,
			collection, // Set collection based on answer input
			validCollections: formData.validCollections,
			difficulty: formData.difficulty,
			status: formData.status,
			queryFilter, // Set queryFilter based on answer input
			queryType, // Set queryType based on answer input
			dataBaseSchema: processedSchema,
		}

		setOutput(JSON.stringify(jsonData, null, 2))
		setShowOutput(true)
	}

	return (
		<div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-xl">
			<h1 className="mb-6 text-2xl font-semibold text-blue-700">
				MongoDB Query Form
			</h1>

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Question Input */}
				<div>
					<label
						htmlFor="question"
						className="block text-sm font-medium text-gray-700"
					>
						Question
					</label>
					<input
						type="text"
						name="question"
						value={formData.question}
						onChange={handleChange}
						className="mt-2 w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>

				{/* Description Input */}
				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-700"
					>
						Description
					</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						rows={4}
						className="mt-2 w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>

				{/* Answer Input */}
				<div>
					<label
						htmlFor="answer"
						className="block text-sm font-medium text-gray-700"
					>
						Answer
					</label>
					<input
						type="text"
						name="answer"
						value={formData.answer}
						onChange={handleChange}
						className="mt-2 w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>

				{/* Collection and Valid Collections */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div>
						<label
							htmlFor="collection"
							className="block text-sm font-medium text-gray-700"
						>
							Collection
						</label>
						<input
							type="text"
							name="collection"
							value={formData.collection}
							onChange={handleChange}
							className="mt-2 w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="validCollections"
							className="block text-sm font-medium text-gray-700"
						>
							Valid Collections (comma-separated)
						</label>
						<input
							type="text"
							name="validCollections"
							value={formData.validCollections.join(', ')}
							onChange={handleValidCollectionsChange}
							className="mt-2 w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>
				</div>

				{/* Difficulty and Status */}
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<div>
						<label
							htmlFor="difficulty"
							className="block text-sm font-medium text-gray-700"
						>
							Difficulty (1-10)
						</label>
						<input
							type="number"
							name="difficulty"
							value={formData.difficulty}
							onChange={handleChange}
							min="1"
							max="10"
							className="mt-2 w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
						/>
					</div>

					<div>
						<label
							htmlFor="status"
							className="block text-sm font-medium text-gray-700"
						>
							Status
						</label>
						<select
							name="status"
							value={formData.status}
							onChange={handleChange}
							className="mt-2 w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
						>
							<option value="TODO">TODO</option>
							<option value="SOLVED">SOLVED</option>
							<option value="ATTEMPTED">ATTEMPTED</option>
						</select>
					</div>
				</div>

				{/* DataBase Schema Inputs */}
				<div>
					<h2 className="mt-6 text-xl font-semibold text-blue-700">
						Database Schema
					</h2>
					{formData.dataBaseSchema.map((schema, index) => (
						<div key={index} className="mb-4 rounded-md border p-4">
							<div>
								<label
									htmlFor={`schemaTitle-${index}`}
									className="block text-sm font-medium text-gray-700"
								>
									Schema Title
								</label>
								<input
									type="text"
									id={`schemaTitle-${index}`}
									value={schema.title}
									onChange={(e) => {
										const newDataBaseSchema = [
											...formData.dataBaseSchema,
										]
										newDataBaseSchema[index].title =
											e.target.value
										setFormData({
											...formData,
											dataBaseSchema: newDataBaseSchema,
										})
									}}
									className="mt-2 w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
								/>
							</div>

							<div>
								<label
									htmlFor={`query-${index}`}
									className="block text-sm font-medium text-gray-700"
								>
									Query
								</label>
								<input
									type="text"
									id={`query-${index}`}
									value={schema.query}
									onChange={(e) =>
										handleDatabaseSchemaChange(e, index)
									}
									className="mt-2 w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
								/>
							</div>

							<button
								type="button"
								onClick={() => handleRemoveSchema(index)}
								className="mt-2 text-red-500"
							>
								Remove Schema
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={handleAddSchema}
						className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white"
					>
						Add Schema
					</button>
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700"
				>
					Generate JSON
				</button>
			</form>

			{/* JSON Output */}
			{showOutput && (
				<div className="mt-8">
					<h2 className="mb-3 text-xl font-semibold text-blue-700">
						Output JSON
					</h2>
					<pre className="overflow-x-auto rounded-md bg-gray-800 p-6 font-mono text-green-400">
						{output}
					</pre>
					<button
						onClick={() => {
							navigator.clipboard.writeText(output)
							alert('JSON copied to clipboard!')
						}}
						className="mt-4 rounded-md bg-gray-600 px-4 py-2 text-sm text-white transition duration-300 hover:bg-gray-700"
					>
						Copy to Clipboard
					</button>
				</div>
			)}
		</div>
	)
}

export default Temp
