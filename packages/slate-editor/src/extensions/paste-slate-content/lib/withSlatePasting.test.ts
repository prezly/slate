import { createEditor } from 'slate';

import { createDataTransfer } from '#lib';

import { withSlatePasting } from './withSlatePasting';

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
        const editor = withSlatePasting(createEditor());

        editor.children = [];

        editor.insertData(
            createDataTransfer({
                'application/x-slate-fragment': encodeFragment(FRAGMENT),
            }),
        );

        expect(editor.children).toMatchObject(FRAGMENT);
    });

    it('should support single-object "application/x-slate-fragment" content', () => {
        const editor = withSlatePasting(createEditor());

        editor.children = [];

        editor.insertData(
            createDataTransfer({
                'application/x-slate-fragment': encodeFragment(SINGLE_NODE_FRAGMENT),
            }),
        );

        expect(editor.children).toMatchObject([SINGLE_NODE_FRAGMENT]);
    });
});
