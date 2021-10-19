/** @jsx jsx */
import { isLinkNode, isParagraphNode } from '@prezly/slate-types';
import { Editor } from 'slate';

import jsx from '../jsx';

import findDescendants from './findDescendants';

describe('findDescendants', () => {
    const editor = ((
        <editor>
            <h-p>
                <h-text>lorem ipsum 1</h-text>
                <h-text>lorem ipsum 2</h-text>

                <h-link href="https://example.com">
                    <h-text>lorem ipsum 3</h-text>
                    <h-text>lorem ipsum 4</h-text>
                </h-link>
            </h-p>
        </editor>
    ) as unknown) as Editor;

    it('Can find all editor node descendants matching the type', () => {
        const descendants = findDescendants(editor, isLinkNode);

        expect(descendants).toEqual([
            [
                <h-link href="https://example.com">
                    <h-text>lorem ipsum 3</h-text>
                    <h-text>lorem ipsum 4</h-text>
                </h-link>,
                [0, 2],
            ],
        ]);
    });

    it('Can find all node descendants matching the type', () => {
        const descendants = findDescendants(editor.children[0], isLinkNode);

        expect(descendants).toEqual([
            [
                <h-link href="https://example.com">
                    <h-text>lorem ipsum 3</h-text>
                    <h-text>lorem ipsum 4</h-text>
                </h-link>,
                [2],
            ],
        ]);
    });

    it('Can find all editor node descendants not matching the type', () => {
        const descendants = findDescendants(editor, (node) => !isParagraphNode(node) && !isLinkNode(node));

        expect(descendants).toEqual([
            [<h-text>lorem ipsum 1</h-text>, [0, 0]],
            [<h-text>lorem ipsum 2</h-text>, [0, 1]],
            [<h-text>lorem ipsum 3</h-text>, [0, 2, 0]],
            [<h-text>lorem ipsum 4</h-text>, [0, 2, 1]],
        ]);
    });

    it('Can find all child node descendants not matching the type', () => {
        const descendants = findDescendants(editor.children[0], (node) => !isParagraphNode(node) && !isLinkNode(node));

        expect(descendants).toEqual([
            [<h-text>lorem ipsum 1</h-text>, [0]],
            [<h-text>lorem ipsum 2</h-text>, [1]],
            [<h-text>lorem ipsum 3</h-text>, [2, 0]],
            [<h-text>lorem ipsum 4</h-text>, [2, 1]],
        ]);
    });
});
