/** @jsx jsx */

import type { Editor, Node } from 'slate';

import { jsx } from '../jsx';

import { insertNodes } from './insertNodes';

describe('insertNodes', () => {
    it('Does nothing when there is no selection', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        insertNodes(editor, [{ text: 'dolor' }]);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Does nothing when there are no nodes to insert', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        insertNodes(editor, [], { ensureEmptyParagraphAfter: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new block element', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
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
        ) as unknown as Editor;

        insertNodes(
            editor,
            nodes([
                <h-p>
                    <h-text>dolor</h-text>
                </h-p>,
            ]),
        );

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new block element with extra paragraph after', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
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
        ) as unknown as Editor;

        insertNodes(
            editor,
            nodes([
                <h-p>
                    <h-text>dolor</h-text>
                </h-p>,
            ]),
            { ensureEmptyParagraphAfter: true },
        );

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new block element with extra paragraph after unless there already is one', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
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
        ) as unknown as Editor;

        insertNodes(
            editor,
            nodes([
                <h-p>
                    <h-text>dolor</h-text>
                </h-p>,
                <h-p>
                    <h-text></h-text>
                </h-p>,
            ]),
            { ensureEmptyParagraphAfter: true },
        );

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts inline nodes into the current block until encountering a block node', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>lorem ipsumxxx</h-text>
                    <h-link href="https://example.com">
                        <h-text>yyy</h-text>
                    </h-link>
                    <h-text />
                </h-p>
                <h-p>
                    <h-text>
                        dolorzzz
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        insertNodes(
            editor,
            nodes([
                <h-text>xxx</h-text>,
                <h-link href="https://example.com">
                    <h-text>yyy</h-text>
                </h-link>,
                <h-p>
                    <h-text>dolor</h-text>
                </h-p>,
                <h-text>zzz</h-text>,
            ]),
        );

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts a new block element and removes an empty paragraph', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>
                        dolor
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        insertNodes(
            editor,
            nodes([
                <h-p>
                    <h-text>dolor</h-text>
                </h-p>,
            ]),
        );

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts inline nodes into the current empty paragraph until encountering a block node', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>xxx</h-text>
                    <h-link href="https://example.com">
                        <h-text>yyy</h-text>
                    </h-link>
                    <h-text>zzz</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        doloraaa
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        insertNodes(
            editor,
            nodes([
                <h-text>xxx</h-text>,
                <h-link href="https://example.com">
                    <h-text>yyy</h-text>
                </h-link>,
                <h-text>zzz</h-text>,
                <h-p>
                    <h-text>dolor</h-text>
                </h-p>,
                <h-text>aaa</h-text>,
            ]),
        );

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts inline nodes into a new paragraph if void node is focused', () => {
        const editor = (
            <editor>
                <h-divider>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-divider>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-divider>
                    <h-text />
                </h-divider>
                <h-p>
                    <h-text>xxx</h-text>
                    <h-link href="https://example.com">
                        <h-text>yyy</h-text>
                    </h-link>
                    <h-text>
                        zzz
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        insertNodes(
            editor,
            nodes([
                <h-text>xxx</h-text>,
                <h-link href="https://example.com">
                    <h-text>yyy</h-text>
                </h-link>,
                <h-text>zzz</h-text>,
            ]),
        );

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts text nodes into a new paragraph after void node', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-divider>
                    <h-text />
                </h-divider>
                <h-p>
                    <h-text>lorem</h-text>
                    <h-text bold>
                        {' ipsum'}
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        insertNodes(editor, [
            <h-divider>
                <h-text />
            </h-divider>,
            <h-text>lorem</h-text>,
            <h-text bold>{' ipsum'}</h-text>,
        ] as unknown as Node[]);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Inserts text nodes after inline void node', () => {
        const editor = (
            <editor>
                <h-p>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-divider>
                    <h-text />
                </h-divider>
                <h-p>
                    <h-text>lorem</h-text>
                    <h-mention username="elvis">
                        <h-text></h-text>
                    </h-mention>
                    <h-text bold>
                        {' dolor'}
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        insertNodes(
            editor,
            nodes([
                <h-divider>
                    <h-text />
                </h-divider>,
                <h-text>lorem</h-text>,
                <h-mention username="elvis">
                    <h-text></h-text>
                </h-mention>,
                <h-text bold>{' dolor'}</h-text>,
            ]),
        );

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});

function nodes(nodes: JSX.IntrinsicElements[keyof JSX.IntrinsicElements][]): Node[] {
    return nodes as unknown as Node[];
}
