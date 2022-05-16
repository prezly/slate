/** @jsx jsx */

import type { BaseText, Editor } from 'slate';

import { jsx } from '../jsx';

import { isMarkActive } from './isMarkActive';

type StyledText = BaseText & { bold?: boolean; underlined?: boolean };

describe('isMarkActive', () => {
    it('Returns "true" when mark is active', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text bold>
                        lorem ipsum
                        <cursor />
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isMarkActive<StyledText>(editor, 'bold')).toBe(true);
    });

    it('Returns "false" when mark is inactive', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text bold>lorem ipsum</h:text>
                    <h:text underlined>
                        lorem ipsum
                        <cursor />
                    </h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isMarkActive<StyledText>(editor, 'bold')).toBe(false);
    });

    it('Returns "false" when there is no selection', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        expect(isMarkActive<StyledText>(editor, 'bold')).toBe(false);
    });
});
