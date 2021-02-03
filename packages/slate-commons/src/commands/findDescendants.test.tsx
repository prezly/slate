/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../jsx';

import findDescendants from './findDescendants';
import isParagraphElement from './isParagraphElement';

describe('findDescendants', () => {
    const editor = ((
        <editor>
            <h-p>
                <h-text>lorem ipsum 1</h-text>
                <h-text>lorem ipsum 2</h-text>

                <h-p>
                    <h-text>lorem ipsum 3</h-text>
                    <h-text>lorem ipsum 4</h-text>
                </h-p>
            </h-p>
        </editor>
    ) as unknown) as Editor;

    it('Can find all editor node descendants matching the type', () => {
        const descendants = findDescendants(editor, isParagraphElement);

        expect(descendants).toEqual([
            [
                <h-p>
                    <h-text>lorem ipsum 1</h-text>
                    <h-text>lorem ipsum 2</h-text>

                    <h-p>
                        <h-text>lorem ipsum 3</h-text>
                        <h-text>lorem ipsum 4</h-text>
                    </h-p>
                </h-p>,
                [0],
            ],
            [
                <h-p>
                    <h-text>lorem ipsum 3</h-text>
                    <h-text>lorem ipsum 4</h-text>
                </h-p>,
                [0, 2],
            ],
        ]);
    });

    it('Can find all child node descendants matching the type', () => {
        const descendants = findDescendants(editor.children[0], isParagraphElement);

        expect(descendants).toEqual([
            [
                <h-p>
                    <h-text>lorem ipsum 3</h-text>
                    <h-text>lorem ipsum 4</h-text>
                </h-p>,
                [2],
            ],
        ]);
    });

    it('Can find all editor node descendants not matching the type', () => {
        const descendants = findDescendants(editor, (node) => !isParagraphElement(node));

        expect(descendants).toEqual([
            [<h-text>lorem ipsum 1</h-text>, [0, 0]],
            [<h-text>lorem ipsum 2</h-text>, [0, 1]],
            [<h-text>lorem ipsum 3</h-text>, [0, 2, 0]],
            [<h-text>lorem ipsum 4</h-text>, [0, 2, 1]],
        ]);
    });

    it('Can find all child node descendants not matching the type', () => {
        const descendants = findDescendants(
            editor.children[0],
            (node) => !isParagraphElement(node),
        );

        expect(descendants).toEqual([
            [<h-text>lorem ipsum 1</h-text>, [0]],
            [<h-text>lorem ipsum 2</h-text>, [1]],
            [<h-text>lorem ipsum 3</h-text>, [2, 0]],
            [<h-text>lorem ipsum 4</h-text>, [2, 1]],
        ]);
    });
});
