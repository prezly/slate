import { createEditor } from 'slate';

import { createDataTransfer } from '#lib';

import { withSlatePasting } from './withSlatePasting';

const FRAGMENT = [
    {
        type: 'heading-one',
        children: [{ text: 'Prezly' }],
    },
    {
        type: 'paragraph',
        children: [{ text: 'Turn your audience into fans.' }],
    },
];

const FRAGMENT_PAYLOAD = window.btoa(encodeURIComponent(JSON.stringify(FRAGMENT)));

describe('withSlatePasting', () => {
    it('should pick up "application/x-slate-fragment" content from the DataTransfer object, if any', () => {
        const editor = withSlatePasting(createEditor());

        editor.children = [];

        editor.insertData(
            createDataTransfer({
                'application/x-slate-fragment': FRAGMENT_PAYLOAD,
            }),
        );

        expect(editor.children).toMatchObject([
            {
                type: 'heading-one',
                children: [{ text: 'Prezly' }],
            },
            {
                type: 'paragraph',
                children: [{ text: 'Turn your audience into fans.' }],
            },
        ]);
    });
});
