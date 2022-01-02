/** @jsx jsx */

import type { Editor } from 'slate';
import { withReact } from 'slate-react';

import { jsx } from '../jsx';

import { removeDivider } from './removeDivider';

describe('removeDivider', () => {
    it('should remove currently focused divider and focus the paragraph before it', () => {
        const input = (
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-divider>
                    <h-text>
                        <cursor />
                    </h-text>
                </h-divider>
                <h-p>
                    <h-text>paragraph after</h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                        paragraph after
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const editor = withReact(input);
        removeDivider(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should do nothing when not focusing a divider node', () => {
        const input = (
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-divider>
                    <h-text />
                </h-divider>
                <h-p>
                    <h-text>
                        <cursor />
                        paragraph before
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h-p>
                    <h-text>paragraph before</h-text>
                </h-p>
                <h-divider>
                    <h-text />
                </h-divider>
                <h-p>
                    <h-text>
                        <cursor />
                        paragraph before
                    </h-text>
                </h-p>
            </editor>
        ) as unknown as Editor;

        const editor = withReact(input);
        removeDivider(editor);

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
