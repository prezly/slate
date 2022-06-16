/** @jsx jsx */

import { Editor } from 'slate';

import { jsx } from '../../jsx';

describe('withNodesHierarchy', () => {
    it('can unwrap node inside list', () => {
        const editor = (
            <editor>
                <ul>
                    <li>
                        <li-text>1</li-text>
                    </li>
                    <li>
                        <li-text>2</li-text>
                    </li>
                    <li>
                        <blockquote>3</blockquote>
                    </li>
                </ul>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <ul>
                    <li>
                        <li-text>1</li-text>
                    </li>
                    <li>
                        <li-text>2</li-text>
                    </li>
                    <li>
                        <li-text>3</li-text>
                    </li>
                </ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
