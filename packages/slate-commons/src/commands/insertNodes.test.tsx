/** @jsx jsx */

import { PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import { Editor } from 'slate';

import jsx from '../jsx';
import { createEditor, INLINE_ELEMENT } from '../test-utils';

import insertNodes from './insertNodes';

describe('insertNodes', () => {
    it('Does nothing when there is no selection', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertNodes(editor, [{ text: 'dolor' }]);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Does nothing when there are no nodes to insert', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertNodes(editor, [], { ensureEmptyParagraphAfter: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new block element', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        dolor
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertNodes(editor, [
            {
                children: [{ text: 'dolor' }],
                type: PARAGRAPH_NODE_TYPE,
            },
        ]);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new block element with extra paragraph after', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-p>
                    <h-text>dolor</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertNodes(
            editor,
            [
                {
                    children: [{ text: 'dolor' }],
                    type: PARAGRAPH_NODE_TYPE,
                },
            ],
            { ensureEmptyParagraphAfter: true },
        );

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new block element with extra paragraph after unless there already is one', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <h-p>
                    <h-text>dolor</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertNodes(
            editor,
            [
                {
                    children: [{ text: 'dolor' }],
                    type: PARAGRAPH_NODE_TYPE,
                },
                {
                    children: [{ text: '' }],
                    type: PARAGRAPH_NODE_TYPE,
                },
            ],
            { ensureEmptyParagraphAfter: true },
        );

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts inline nodes into the current block until encountering a block node', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsumxxx</h-text>
                    <h-inline-element>
                        <h-text>yyy</h-text>
                    </h-inline-element>
                    <h-text />
                </h-p>
                <h-p>
                    <h-text>
                        dolorzzz
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertNodes(editor, [
            { text: 'xxx' },
            {
                children: [{ text: 'yyy' }],
                type: INLINE_ELEMENT,
            },
            {
                children: [{ text: 'dolor' }],
                type: PARAGRAPH_NODE_TYPE,
            },
            { text: 'zzz' },
        ]);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new block element and removes an empty paragraph', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>
                        dolor
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertNodes(editor, [
            {
                children: [{ text: 'dolor' }],
                type: PARAGRAPH_NODE_TYPE,
            },
        ]);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts inline nodes into the current empty paragraph until encountering a block node', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>xxx</h-text>
                    <h-inline-element>
                        <h-text>yyy</h-text>
                    </h-inline-element>
                    <h-text>zzz</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        doloraaa
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertNodes(editor, [
            { text: 'xxx' },
            {
                children: [{ text: 'yyy' }],
                type: INLINE_ELEMENT,
            },
            { text: 'zzz' },
            {
                children: [{ text: 'dolor' }],
                type: PARAGRAPH_NODE_TYPE,
            },
            { text: 'aaa' },
        ]);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts inline nodes into a new paragraph if void node is focused', () => {
        const editor = createEditor(
            <editor>
                <h-void-element>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-void-element>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-void-element>
                    <h-text />
                </h-void-element>
                <h-p>
                    <h-text>xxx</h-text>
                    <h-inline-element>
                        <h-text>yyy</h-text>
                    </h-inline-element>
                    <h-text>
                        zzz
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertNodes(editor, [
            { text: 'xxx' },
            {
                children: [{ text: 'yyy' }],
                type: INLINE_ELEMENT,
            },
            { text: 'zzz' },
        ]);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts text nodes into a new paragraph after void node', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-void-element>
                    <h-text />
                </h-void-element>
                <h-p>
                    <h-text>lorem</h-text>
                    <h-text bold>
                        {' ipsum'}
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertNodes(editor, [
            {
                children: [{ text: '' }],
                type: 'void-element',
            },
            {
                text: 'lorem',
            },
            {
                bold: true,
                text: ' ',
            },
            {
                bold: true,
                text: 'ipsum',
            },
        ]);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts text nodes after inline void node', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-void-element>
                    <h-text />
                </h-void-element>
                <h-p>
                    <h-text>lorem</h-text>
                    <h-inline-void-element>
                        <h-text>ipsum</h-text>
                    </h-inline-void-element>
                    <h-text bold>
                        {' dolor'}
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        insertNodes(editor, [
            {
                children: [{ text: '' }],
                type: 'void-element',
            },
            {
                text: 'lorem',
            },
            {
                children: [{ text: 'ipsum' }],
                type: 'inline-void-element',
            },
            {
                bold: true,
                text: ' ',
            },
            {
                bold: true,
                text: 'dolor',
            },
        ]);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
