/* eslint-disable react/no-unknown-property */
/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../../jsx';

import { withBreaksOnVoidNodes } from './withBreaksOnVoidNodes';

describe('withBreaksOnVoidNodes', () => {
    it('should insert an empty paragraph after the void element when requesting a break', () => {
        const editor = (
            <editor withOverrides={[withBreaksOnVoidNodes]}>
                <h:paragraph>
                    <h:text>paragraph before</h:text>
                </h:paragraph>
                <h:divider>
                    <h:text />
                    <cursor />
                </h:divider>
                <h:paragraph>
                    <h:text>paragraph after</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>paragraph before</h:text>
                </h:paragraph>
                <h:divider>
                    <h:text />
                </h:divider>
                <h:paragraph>
                    <h:text />
                    <cursor />
                </h:paragraph>
                <h:paragraph>
                    <h:text>paragraph after</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        Editor.insertBreak(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
