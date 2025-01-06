import * as monaco from 'monaco-editor';

export const mongodbCompletion = {
    provideCompletionItems: (
        model: monaco.editor.ITextModel,
        position: monaco.Position
    ) => {
        const word = model.getWordUntilPosition(position);
        const range = new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn
        );

        const suggestions: monaco.languages.CompletionItem[] = [
            // Common Database Commands
            {
                label: 'db',
                kind: monaco.languages.CompletionItemKind.Module,
                insertText: 'db',
                detail: 'MongoDB database object',
                range: range,
            },
            {
                label: 'db.collection.find',
                kind: monaco.languages.CompletionItemKind.Method,
                insertText: 'db.collection.find({${1}})', // Cursor will be placed between {}
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                detail: 'MongoDB find query',
                range: range,
            },
            {
                label: 'db.collection.insertOne',
                kind: monaco.languages.CompletionItemKind.Method,
                insertText: 'db.collection.insertOne({${1}})', // Cursor will be placed between {}
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                detail: 'Insert a single document into a collection',
                range: range,
            },
            {
                label: 'db.collection.updateOne',
                kind: monaco.languages.CompletionItemKind.Method,
                insertText:
                    'db.collection.updateOne({${1}}, { \\$set: {${2}} })', // Cursor will be placed between {}
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                detail: 'Update a single document in a collection',
                range: range,
            },
            {
                label: 'db.collection.deleteOne',
                kind: monaco.languages.CompletionItemKind.Method,
                insertText: 'db.collection.deleteOne({${1}})', // Cursor will be placed between {}
                insertTextRules:
                    monaco.languages.CompletionItemInsertTextRule
                        .InsertAsSnippet,
                detail: 'Delete a single document from a collection',
                range: range,
            },

            // Aggregation Stages
            {
                label: '$match',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: '"$match": {${1}}', // Cursor will be placed between {}
                detail: 'Filter documents in an aggregation pipeline',
                range: range,
            },
            {
                label: '$group',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: '"$group": {${1}}', // Cursor will be placed between {}
                detail: 'Group documents by a specified key',
                range: range,
            },
            {
                label: '$sort',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: '"$sort": {${1}}', // Cursor will be placed between {}
                detail: 'Sort documents in an aggregation pipeline',
                range: range,
            },
            {
                label: '$project',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: '"$project": {${1}}', // Cursor will be placed between {}
                detail: 'Include or exclude fields in output documents',
                range: range,
            },

            // Operators
            {
                label: '$eq',
                kind: monaco.languages.CompletionItemKind.Operator,
                insertText: '"$eq": {${1}}', // Cursor will be placed between {}
                detail: 'Equality operator',
                range: range,
            },
            {
                label: '$gt',
                kind: monaco.languages.CompletionItemKind.Operator,
                insertText: '"$gt": {${1}}', // Cursor will be placed between {}
                detail: 'Greater than operator',
                range: range,
            },
            {
                label: '$in',
                kind: monaco.languages.CompletionItemKind.Operator,
                insertText: '"$in": [${1}]', // Cursor will be placed between []
                detail: 'In operator',
                range: range,
            },
        ];

        return { suggestions };
    },
};

export default mongodbCompletion;
