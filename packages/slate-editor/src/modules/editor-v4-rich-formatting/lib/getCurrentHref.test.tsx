/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../jsx';

import getCurrentHref from './getCurrentHref';

describe('getCurrentHref', () => {
    it('Returns "null" when link is not selected', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                    <h-text>lorem ipsum</h-text>
                    <h-a href="http://example.com">
                        <h-text>link</h-text>
                    </h-a>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        expect(getCurrentHref(editor, editor.selection!)).toBeNull();
    });

    it('Returns "href" of the selected link', () => {
        const editor = ((
            <editor>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <h-a href="http://example.com">
                        <anchor />
                        <h-text>link</h-text>
                        <focus />
                    </h-a>
                    <h-text>lorem ipsum</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        expect(getCurrentHref(editor, editor.selection!)).toBe('http://example.com');
    });
});
