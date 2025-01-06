/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-useless-escape */
import * as monaco from 'monaco-editor';

export const mongodbLanguageConfiguration = {
    comments: {
        lineComment: '//',
        blockComment: ['/*', '*/'] as [string, string],
    },
    brackets: [
        ['{', '}'] as monaco.languages.CharacterPair,
        ['[', ']'] as monaco.languages.CharacterPair,
        ['(', ')'] as monaco.languages.CharacterPair,
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"', notIn: ['string'] },
        { open: "'", close: "'", notIn: ['string', 'comment'] },
    ],
    folding: {
        markers: {
            start: new RegExp('^\\s*//\\s*#?region\\b'),
            end: new RegExp('^\\s*//\\s*#?endregion\\b'),
        },
    },
    wordPattern: /(-?\d*\.\d\w*)|([a-zA-Z_][\w\$]*)/,

    onEnterRules: [
        {
            // e.g. db.collection.aggregate([
            beforeText: /^\s*(db\.\w+\.\w+$begin:math:text$)$/,
            action: {
                indentAction: monaco.languages.IndentAction.Indent,
            },
        },

        {
            // e.g. closing aggregation array or object
            beforeText: /^\\s*(\\]|\\})\\s*$end:math:text$\s*$/,
            action: {
                indentAction: monaco.languages.IndentAction.Outdent,
            },
        },
        {
            // e.g. Enter within a nested object { ... }
            beforeText: /^(\t|(\ \ ))*\ \{(\ [^{}]*)?$/,
            action: {
                indentAction: monaco.languages.IndentAction.Indent,
            },
        },
        {
            // e.g. Enter within an array [ ... ]
            beforeText:
                /^(\t|(\ \ ))*\ $begin:math:display$(\\ [^$end:math:display$]*)?$/,
            action: {
                indentAction: monaco.languages.IndentAction.Indent,
            },
        },
        {
            // e.g. db.collection.find({...|
            beforeText: /^\s*(db\.\w+\.\w+\(\s*\{[^\}]*|\[)$/,
            action: {
                indentAction: monaco.languages.IndentAction.Indent,
            },
        },
    ],
};

export default mongodbLanguageConfiguration;
