/** @jsx jsx */

import { Alignment } from '@prezly/slate-types';
import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Lists', () => {
    it('should be kept after normalization', () => {
        const editor = (
            <editor>
                <h:ol align={Alignment.LEFT}>
                    <h:li>
                        <h:li-text>
                            <h-text>First</h-text>
                        </h:li-text>
                    </h:li>
                    <h:li>
                        <h:li-text>
                            <h-text>Second</h-text>
                        </h:li-text>
                    </h:li>
                    <h:li>
                        <h:li-text>
                            <h-text>Third</h-text>
                        </h:li-text>
                    </h:li>
                </h:ol>
                <h:ul align={Alignment.LEFT}>
                    <h:li>
                        <h:li-text>
                            <h-text>First</h-text>
                        </h:li-text>
                    </h:li>
                    <h:li>
                        <h:li-text>
                            <h-text>Second</h-text>
                        </h:li-text>
                    </h:li>
                    <h:li>
                        <h:li-text>
                            <h-text>Third</h-text>
                        </h:li-text>
                    </h:li>
                </h:ul>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:ol align={Alignment.LEFT}>
                    <h:li>
                        <h:li-text>
                            <h-text>First</h-text>
                        </h:li-text>
                    </h:li>
                    <h:li>
                        <h:li-text>
                            <h-text>Second</h-text>
                        </h:li-text>
                    </h:li>
                    <h:li>
                        <h:li-text>
                            <h-text>Third</h-text>
                        </h:li-text>
                    </h:li>
                </h:ol>
                <h:ul align={Alignment.LEFT}>
                    <h:li>
                        <h:li-text>
                            <h-text>First</h-text>
                        </h:li-text>
                    </h:li>
                    <h:li>
                        <h:li-text>
                            <h-text>Second</h-text>
                        </h:li-text>
                    </h:li>
                    <h:li>
                        <h:li-text>
                            <h-text>Third</h-text>
                        </h:li-text>
                    </h:li>
                </h:ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('can unwrap blockquote inside list item', () => {
        const editor = (
            <editor>
                <ul>
                    <li>
                        <li-text>
                            <h-text>1</h-text>
                        </li-text>
                    </li>
                    <li>
                        <h-text>2</h-text>
                    </li>
                    <li>
                        <blockquote>
                            <h-text>3</h-text>
                        </blockquote>
                    </li>
                </ul>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <ul>
                    <li>
                        <li-text>
                            <h-text>1</h-text>
                        </li-text>
                    </li>
                    <li>
                        <li-text>
                            <h-text>2</h-text>
                        </li-text>
                    </li>
                    <li>
                        <li-text>
                            <h-text>3</h-text>
                        </li-text>
                    </li>
                </ul>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
