import React, { useEffect } from 'react';
import MonacoEditor, { loader, useMonaco } from '@monaco-editor/react';
import { mongodbCompletion } from './editorConfig/mongodbCompletion';
import * as monaco from 'monaco-editor';
import mongodbLanguage from './editorConfig/mongodbLanguage';
import mongodbDocumentSemantic from './editorConfig/mongodbDocumentSemantic';
import mongodbLanguageConfiguration from './editorConfig/mongodbLanguageConfiguration';
import { mongodbCustomTheme } from './editorConfig/mongodbCustomTheme';
loader.config({ monaco });

interface EditorComponentProps {
    onQueryChange?: (query: string) => void;
}

const EditorComponent: React.FC<EditorComponentProps> = ({ onQueryChange }) => {
    const monacoNew = useMonaco();

    useEffect(() => {
        monacoNew?.languages.typescript.javascriptDefaults.setEagerModelSync(
            true
        );
        if (monacoNew) {
            // Register MongoDB language
            if (
                !monacoNew.languages
                    .getLanguages()
                    .some((lang) => lang.id === 'mongodb')
            ) {
                monacoNew.languages.register({ id: 'mongodb' });
            }

            monacoNew.editor.defineTheme(
                'mongodbCustomTheme',
                mongodbCustomTheme
            );

            monaco.languages.setLanguageConfiguration(
                'mongodb',
                mongodbLanguageConfiguration
            );

            monacoNew.languages.setMonarchTokensProvider(
                'mongodb',
                mongodbLanguage
            );

            monacoNew.languages.registerDocumentSemanticTokensProvider(
                'mongodb',
                mongodbDocumentSemantic
            );

            // Register completion item provider for MongoDB
            monacoNew.languages.registerCompletionItemProvider(
                'mongodb',
                mongodbCompletion
            );

            // TODO: Implement formatting for MongoDB
            // monacoNew.languages.registerDocumentFormattingEditProvider(
            //     'mongodb',
            //     {
            //         provideDocumentFormattingEdits: (model, options, token) => {
            //             return [
            //                 {
            //                     range: model.getFullModelRange(),
            //                     text: model.getValue(),
            //                 },
            //             ];
            //         },
            //     }
            // );
        }
    }, [monacoNew]);

    const handleEditorChange = (value: string | undefined) => {
        if (onQueryChange && value !== undefined) {
            onQueryChange(value);
        }
    };

    return (
        <MonacoEditor
            height="500px"
            defaultLanguage="mongodb"
            // defaultValue="// Write your MongoDB query here"
            onChange={handleEditorChange}
            theme="mongodbCustomTheme"
            options={{
                minimap: { enabled: false },
                readOnly: false,
                scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
                wordWrap: 'on',
                wrappingIndent: 'same',
                fontFamily: 'Geist',
                fontSize: 14,
                lineHeight: 20,
                glyphMargin: false,
                renderLineHighlight: 'none',
                overviewRulerBorder: false,
                folding: false,
                rulers: [],
            }}
        />
    );
};

export default EditorComponent;
