/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../jsx';

import isMarkActive from './isMarkActive';

const EXAMPLE_MARK_1 = 'bold';
const EXAMPLE_MARK_2 = 'underlined';

describe('isMarkActive', () => {
    it('Returns "true" when mark is active', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text {...{ [EXAMPLE_MARK_1]: true }}>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        expect(isMarkActive(editor, EXAMPLE_MARK_1)).toBe(true);
    });

    it('Returns "false" when mark is inactive', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text {...{ [EXAMPLE_MARK_1]: true }}>lorem ipsum</h-text>
                    <h-text {...{ [EXAMPLE_MARK_2]: true }}>
                        lorem ipsum
                        <cursor />
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        expect(isMarkActive(editor, EXAMPLE_MARK_1)).toBe(false);
    });

    it('Returns "false" when there is no selection', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        expect(isMarkActive(editor, EXAMPLE_MARK_1)).toBe(false);
    });
});
