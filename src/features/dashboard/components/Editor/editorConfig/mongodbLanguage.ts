// MongoDB language configuration
export const mongodbLanguage = {
	defaultToken: 'invalid',
	tokenPostfix: '.mongo',

	keywords: [
		'db',
		'collection',
		'createCollection',
		'drop',
		'find',
		'findOne',
		'findAndModify',
		'insertOne',
		'insertMany',
		'updateOne',
		'updateMany',
		'deleteOne',
		'deleteMany',
		'show',
		'use',
		'exit',
		'show dbs',
		'show databases',
		'show collections',
	],

	operators: [
		'_id',
		'$eq',
		'$gt',
		'$gte',
		'$lt',
		'$lte',
		'$ne',
		'$in',
		'$nin',
		'$regex',
		'$text',
		'$where',
		'$and',
		'$or',
		'$not',
		'$nor',
		'$exists',
		'$type',
		'$size',
		'$comment',
		'$set',
		'$unset',
		'$inc',
		'$mul',
		'$push',
		'$addToSet',
		'$pop',
		'$pull',
		'$pullAll',
		'$geoNear',
		'$geoWithin',
		'$geoIntersects',
		'$match',
		'$group',
		'$project',
		'$unwind',
		'$sort',
		'$limit',
		'$skip',
		'$count',
		'$lookup',
		'$aggregate',
		'$addFields',
		'$bucket',
		'$facet',
		'$merge',
		'$out',
	],

	tokenizer: {
		root: [
			// Match the $ operator separately
			{
				regex: /\$/g,
				action: { token: 'operator.keyword' }, // Color only the $ symbol
			},
			// Match the rest of the operators
			// {
			//     regex: /[a-zA-Z_][\w$]*/g,
			//     action: { token: 'operator' }, // Color the rest of the operator normally
			// },
			// Brackets
			{ regex: /[{}[\]]/, action: 'delimiter.bracket' },

			// Keywords and identifiers
			{
				regex: /\b[a-zA-Z_$][\w$]*\b/,
				action: {
					cases: {
						'@keywords': 'keyword',
						'@operators': 'operator',
						'@default': 'identifier',
					},
				},
			},

			// Numbers
			{ regex: /\d+/, action: 'number' },

			// Strings
			{ regex: /"([^"\\]|\\.)*$/, action: 'string.invalid' },
			{ regex: /'([^'\\]|\\.)*$/, action: 'string.invalid' },
			{ regex: /"[^"]*"/, action: 'string' },
			{ regex: /'[^']*'/, action: 'string' },

			// ObjectId pattern
			{
				regex: /ObjectId\("([a-f0-9]{24})"\)/,
				action: 'objectId',
			},

			// Regular expressions
			{ regex: /\/[^\/]+\/[gimsuy]*/, action: 'regexp' },

			// Delimiters
			{ regex: /[,:]/, action: 'delimiter' },

			// Comments
			{
				regex: /\/\*/,
				action: { token: 'comment', next: '@comment' },
			},
			{ regex: /\/\/.*$/, action: 'comment' },
		],

		comment: [
			{
				regex: /\*\//,
				action: { token: 'comment', next: '@pop' },
			},
			{ regex: /[^*]+/, action: 'comment' },
			{ regex: /./, action: 'comment' },
		],
	},
}

export default mongodbLanguage
