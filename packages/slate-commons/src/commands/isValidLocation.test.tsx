/** @jsx jsx */
import { isParagraphNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

import jsx from '../jsx';

import isValidLocation from './isValidLocation';

import removeNode from './removeNode';

describe('isValidLocation', () => {
    it('Returns "true" when using the current cursor location', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        expect(isValidLocation(editor, editor.selection!)).toBe(true);
    });

    it('Returns "true" when using a valid path', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        expect(isValidLocation(editor, [0, 0])).toBe(true);
    });

    it('Returns "false" when the path is out of range', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        expect(isValidLocation(editor, [1, 0])).toBe(false);
        expect(isValidLocation(editor, [0, 2])).toBe(false);
    });

    it('Returns "false" when using a stored path but the node was removed', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text>first paragraph</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        second paragraph
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        const storedSelection = editor.selection!;
        removeNode(editor, {
            at: storedSelection,
            match: isParagraphNode,
        });

        expect(isValidLocation(editor, storedSelection)).toBe(false);
    });
});
