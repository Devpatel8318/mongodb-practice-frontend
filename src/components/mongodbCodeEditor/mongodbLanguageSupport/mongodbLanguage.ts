/* eslint-disable no-useless-escape */
const mongodbLanguage = {
	defaultToken: 'invalid',
	tokenPostfix: '.mongo',

	keywords: [],

	// functions: [
	// 	'aggregate',
	// 	'collection',
	// 	'createCollection',
	// 	'drop',
	// 	'find',
	// 	'findOne',
	// 	'findAndModify',
	// 	'insertOne',
	// 	'insertMany',
	// 	'updateOne',
	// 	'updateMany',
	// 	'deleteOne',
	// 	'deleteMany',
	// 	'show',
	// 	'use',
	// 	'exit',
	// 	'count',
	// 	'countDocuments',
	// 	'distinct',
	// 	'bulkWrite',
	// 	'rename',
	// 	'cloneCollection',
	// 	'createIndex',
	// 	'dropIndex',
	// 	'listIndexes',
	// 	'indexExists',
	// 	'getIndexes',
	// 	'watch',
	// 	'aggregateCursor',
	// 	'update',
	// 	'insert',
	// 	'delete',
	// 	'mapReduce',
	// 	'findOneAndDelete',
	// 	'findOneAndUpdate',
	// 	'findOneAndReplace',
	// 	'save',
	// 	'size',
	// 	'validate',
	// 	'getShardDistribution',
	// 	'findOneAndModify',
	// 	'unionWith',
	// ],

	db: ['db'],
	newkeyword: ['new'],
	isoDate: ['ISODate'],

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
		'$all',
		'$elemMatch',
		'$mod',
		'$expr',
		'$jsonSchema',
		'$near',
		'$nearSphere',
		'$rename',
		'$setOnInsert',
		'$currentDate',
		'$bit',
		'$min',
		'$max',
		'$indexOfBytes',
		'$indexOfCP',
		'$let',
		'$cond',
		'$switch',
		'$case',
		'$reduce',
		'$map',
		'$filter',
		'$arrayToObject',
		'$objectToArray',
		'$concatArrays',
		'$zip',
		'$isArray',
		'$literal',
		'$ifNull',
		'$dayOfWeek',
		'$dayOfYear',
		'$isoDayOfWeek',
		'$isoWeek',
		'$isoYear',
		'$week',
		'$year',
		'$month',
		'$dayOfMonth',
		'$hour',
		'$minute',
		'$second',
		'$millisecond',
		'$dateToString',
		'$dateFromParts',
		'$dateToParts',
		'$dateDiff',
		'$convert',
		'$regexMatch',
	],

	tokenizer: {
		root: [
			// $operators (force ALL $identifiers to get styled properly)
			{
				regex: /\$[a-zA-Z_][\w$]*/,
				action: 'operator', // ✅ style all $-prefixed words as operators
			},

			// Special keywords
			{ regex: /\bnew\b/, action: 'newkeyword' },
			{ regex: /\bISODate\b/, action: 'isoDate' },
			// {
			// 	regex: /\b(aggregate|find|insert|update|delete|show|use)\b/,
			// 	action: 'function', // Treat these as functions and apply function styling (blue)
			// },
			{
				regex: /\b(db\.[a-zA-Z_][\w$]*)\b/,
				action: 'db', // Treat db.collection as db token
			},

			// General identifiers (like totalOrderValue, etc.)
			{
				regex: /[a-zA-Z_][\w$]*/,
				action: {
					cases: {
						'@keywords': 'keyword',
						'@default': 'keyword', // ✅ color object keys like `totalOrderValue`
					},
				},
			},

			// ObjectId
			// { regex: /ObjectId\("([a-f0-9]{24})"\)/, action: 'objectId' },
			{ regex: /\b(ObjectId\("([a-f0-9]{24})"\))\b/, action: 'objectId' }, // Extended to match full ObjectId

			// Numbers
			{ regex: /\b\d+(\.\d+)?\b/, action: 'number' },

			// Regex
			{ regex: /\/[^\/]+\/[gimsuy]*/, action: 'regexp' },

			// Strings
			{ regex: /"([^"\\]|\\.)*"/, action: 'string' },
			{ regex: /'([^'\\]|\\.)*'/, action: 'string' },

			// Delimiters
			{ regex: /[{}[\],:]/, action: 'delimiter' },

			// Comments
			{ regex: /\/\*/, action: { token: 'comment', next: '@comment' } },
			{ regex: /\/\/.*$/, action: 'comment' },
		],

		comment: [
			{ regex: /\*\//, action: { token: 'comment', next: '@pop' } },
			{ regex: /[^*]+/, action: 'comment' },
			{ regex: /./, action: 'comment' },
		],
	},
}

export default mongodbLanguage
