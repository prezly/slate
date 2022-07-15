import { createEditor as createSlateEditor } from 'slate';

import { createEditor } from '#modules/editor';

import { isEditorValueEqual } from './isEditorValueEqual';

describe('slate-editor - isEditorValueEqual', () => {
    it('should consider structural equality', () => {
        const editor = createEditor(createSlateEditor(), () => []);

        const a = [
            {
                type: 'paragraph',
                children: [{ text: 'Hello', bold: true }],
            },
        ];
        const b = [
            {
                children: [{ bold: true, text: 'Hello' }],
                type: 'paragraph',
            },
        ];

        expect(isEditorValueEqual(editor, a, b)).toBe(true);
    });
});
