import type { Editor } from 'slate';
import { createEditor as createSlateEditor } from 'slate';
import type { ReactEditor } from 'slate-react';
import { withReact } from 'slate-react';

import { createDataTransfer } from '#lib';

import { withSlatePasting } from './withSlatePasting';

function createEditor(): Editor & ReactEditor {
    return withSlatePasting(withReact(createSlateEditor()));
}

function encodeFragment(fragment: any): string {
    return window.btoa(encodeURIComponent(JSON.stringify(fragment)));
}

const FRAGMENT: object[] = [
    {
        type: 'heading-one',
        children: [{ text: 'Prezly' }],
    },
    {
        type: 'paragraph',
        children: [{ text: 'Turn your audience into fans.' }],
    },
];

const SINGLE_NODE_FRAGMENT: object = FRAGMENT[0];

describe('withSlatePasting', () => {
    it('should pick up "application/x-slate-fragment" content from the DataTransfer object, if any', () => {
        const editor = createEditor();

        editor.children = [];

        editor.insertData(
            createDataTransfer({
                'application/x-slate-fragment': encodeFragment(FRAGMENT),
            }),
        );

        expect(editor.children).toMatchObject(FRAGMENT);
    });

    it('should support single-object "application/x-slate-fragment" content', () => {
        const editor = createEditor();

        editor.children = [];

        editor.insertData(
            createDataTransfer({
                'application/x-slate-fragment': encodeFragment(SINGLE_NODE_FRAGMENT),
            }),
        );

        expect(editor.children).toMatchObject([SINGLE_NODE_FRAGMENT]);
    });

    it('should gracefully handle "application/x-slate-fragment" content containing non-node data', () => {
        const editor = createEditor();

        editor.children = [];

        editor.insertData(
            createDataTransfer({
                'application/x-slate-fragment': encodeFragment({
                    title: 'This is not a valid node',
                }),
            }),
        );

        expect(editor.children).toEqual([]);
    });

    const UNEXPECTED_FRAGMENT_VALUES = {
        string: 'Hello',
        number: 5,
        boolean: false,
        null: null,
    };

    for (const [type, value] of Object.entries(UNEXPECTED_FRAGMENT_VALUES)) {
        it(`should gracefully handle "application/x-slate-fragment" content containing ${type} value`, () => {
            const editor = createEditor();

            editor.children = [];

            editor.insertData(
                createDataTransfer({
                    'application/x-slate-fragment': encodeFragment(value),
                }),
            );

            expect(editor.children).toEqual([]);
        });
    }

    it(`should gracefully handle "application/x-slate-fragment" content containing undecodable value`, () => {
        const editor = createEditor();

        editor.children = [];

        editor.insertData(
            createDataTransfer({
                'application/x-slate-fragment': '=== THIS IS NOT VALID ENCODING ===',
            }),
        );

        expect(editor.children).toEqual([]);
    });
});
