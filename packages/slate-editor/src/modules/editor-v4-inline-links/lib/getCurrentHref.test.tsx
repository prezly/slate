/** @jsx jsx */

import type { Editor } from 'slate';

import { jsx } from '../jsx';

import { getCurrentHref } from './getCurrentHref';

describe('getCurrentHref', () => {
    it('Returns "null" when link is not selected', () => {
        const editor = (
            <editor>
                <paragraph>
                    <text>lorem ipsum</text>
                    <cursor />
                    <text>lorem ipsum</text>
                    <link href="http://example.com">
                        <text>link</text>
                    </link>
                </paragraph>
            </editor>
        ) as unknown as Editor;

        expect(getCurrentHref(editor, editor.selection!)).toBeNull();
    });

    it('Returns "href" of the selected link', () => {
        const editor = (
            <editor>
                <paragraph>
                    <text>lorem ipsum</text>
                    <link href="http://example.com">
                        <anchor />
                        <text>link</text>
                        <focus />
                    </link>
                    <text>lorem ipsum</text>
                </paragraph>
            </editor>
        ) as unknown as Editor;

        expect(getCurrentHref(editor, editor.selection!)).toBe('http://example.com');
    });
});
