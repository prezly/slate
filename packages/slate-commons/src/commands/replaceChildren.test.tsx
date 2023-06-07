/** @jsx hyperscript */

import type { Text } from 'slate';
import { Editor } from 'slate';

import { hyperscript } from '../hyperscript';

import { replaceChildren } from './replaceChildren';

describe('replaceChildren', () => {
    it('should replace children, making sure there is always an empty Text node', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>aaa</h:text>
                    <h:link href="https://example.com">
                        <h:text>this text has no right being here</h:text>
                    </h:link>
                    <h:text>bbb</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>aaa</h:text>
                    <h:link href="https://example.com">
                        <h:text />
                    </h:link>
                    <h:text>bbb</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        replaceChildren(editor, Editor.node(editor, [0, 1]), []);

        expect(editor.children).toEqual(expected.children);
    });

    it('should replace children with the new given list of nodes', () => {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:text>aaa</h:text>
                    <h:link href="https://example.com">
                        <h:text>this text has no right being here</h:text>
                    </h:link>
                    <h:text>bbb</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>Hello </h:text>
                    <h:text bold>world</h:text>
                    <h:text>!</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        replaceChildren(editor, Editor.node(editor, [0]), [
            { text: 'Hello ' },
            { text: 'world', bold: true } as Text,
            { text: '!' },
        ]);

        expect(editor.children).toEqual(expected.children);
    });
});
