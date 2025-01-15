import { createEditor as createSlateEditor } from 'slate';

import { createEditor } from '#modules/editor';

import { isEditorValueEqual } from './isEditorValueEqual';

describe('isEditorValueEqual', () => {
    it('should return true for equivalent values', () => {
        const editor = createEditor({ editor: createSlateEditor() });

        const a = [
            {
                type: 'paragraph',
                children: [{ text: 'Hello', bold: true }],
            },
        ];
        const b = [
            {
                type: 'paragraph',
                children: [{ text: 'Hello', bold: true }],
            },
        ];

        expect(isEditorValueEqual(editor, a, b)).toBe(true);
    });

    it('should return false for non-equivalent values', () => {
        const editor = createEditor({ editor: createSlateEditor() });

        const a = [
            {
                type: 'paragraph',
                children: [{ text: 'Hello', bold: true }],
            },
        ];
        const b = [
            {
                type: 'paragraph',
                children: [{ text: 'hello', bold: true }],
            },
        ];

        expect(isEditorValueEqual(editor, a, b)).toBe(false);
    });

    it('should consider structural equality', () => {
        const editor = createEditor({ editor: createSlateEditor() });

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
