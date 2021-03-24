/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../jsx';
import { createEditor } from '../test-utils';

describe('editor-v4 - withVoids', () => {
    it('Properly removes text from trailing paragraph', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>text before</h-text>
                </h-p>
                <h-divider>
                    <h-text>
                        <anchor />
                    </h-text>
                </h-divider>
                <h-p>
                    <h-text>
                        text <focus />
                        after
                    </h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>text before</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        <cursor />
                        after
                    </h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        editor.deleteFragment();

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Properly removes text from leading paragraph', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>
                        text <anchor />
                        before
                    </h-text>
                </h-p>
                <h-divider>
                    <h-text>
                        <focus />
                    </h-text>
                </h-divider>
                <h-p>
                    <h-text>text after</h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>
                        text <cursor />
                    </h-text>
                </h-p>
                <h-p>
                    <h-text>text after</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        editor.deleteFragment();

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Properly removes 2 consecutive void blocks after a paragraph', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>text before</h-text>
                </h-p>
                <h-divider>
                    <h-text>
                        <anchor />
                    </h-text>
                </h-divider>
                <h-divider>
                    <h-text>
                        <focus />
                    </h-text>
                </h-divider>
                <h-p>
                    <h-text>text after</h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>
                        text before
                        <cursor />
                    </h-text>
                </h-p>
                <h-p>
                    <h-text>text after</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        editor.deleteFragment();

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Properly removes 2 consecutive void blocks after 2 paragraphs', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>text before</h-text>
                </h-p>
                <h-p>
                    <h-text>text before</h-text>
                </h-p>
                <h-divider>
                    <h-text>
                        <anchor />
                    </h-text>
                </h-divider>
                <h-divider>
                    <h-text>
                        <focus />
                    </h-text>
                </h-divider>
                <h-p>
                    <h-text>text after</h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>text before</h-text>
                </h-p>
                <h-p>
                    <h-text>
                        text before
                        <cursor />
                    </h-text>
                </h-p>
                <h-p>
                    <h-text>text after</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        editor.deleteFragment();

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Properly removes 4 consecutive void blocks', () => {
        const editor = createEditor(
            <editor>
                <h-p>
                    <h-text>text before</h-text>
                </h-p>
                <h-divider>
                    <h-text>
                        <anchor />
                    </h-text>
                </h-divider>
                <h-divider>
                    <h-text />
                </h-divider>
                <h-divider>
                    <h-text />
                </h-divider>
                <h-divider>
                    <h-text>
                        <focus />
                    </h-text>
                </h-divider>
                <h-p>
                    <h-text>text after</h-text>
                </h-p>
            </editor>,
        );

        const expected = ((
            <editor>
                <h-p>
                    <h-text>
                        text before
                        <cursor />
                    </h-text>
                </h-p>
                <h-p>
                    <h-text>text after</h-text>
                </h-p>
            </editor>
        ) as unknown) as Editor;

        editor.deleteFragment();

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
