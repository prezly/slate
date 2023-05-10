/** @jsx hyperscript */

import { isElementNode, PARAGRAPH_NODE_TYPE } from '@prezly/slate-types';
import type { ElementEntry, NodeEntry } from 'slate';
import { Editor, Element } from 'slate';

import { hyperscript } from '../hyperscript';

import { normalizeNestedElement } from './normalizeNestedElement';

function withElementNormalization(editor: Editor, normalization: (entry: ElementEntry) => boolean) {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry: NodeEntry) => {
        const [node, path] = entry;
        if (Element.isElement(node) && normalization([node, path])) {
            return;
        }

        normalizeNode(entry);
    };
}

describe('normalizeNestedElement', () => {
    it('should lift element nodes that are only allowed on top level', function () {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:paragraph>
                        <h:text>
                            Contrary to popular belief, Lorem Ipsum is not simply random text.
                        </h:text>
                    </h:paragraph>
                    <h:paragraph>
                        <h:paragraph>
                            <h:text>
                                <cursor />
                                It has roots in a piece of classical Latin literature from 45 BC,
                            </h:text>
                        </h:paragraph>
                    </h:paragraph>
                </h:paragraph>
                <h:paragraph>
                    <h:text>making it over 2000 years old.</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>
                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                    </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>
                        <cursor />
                        It has roots in a piece of classical Latin literature from 45 BC,
                    </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>making it over 2000 years old.</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        withElementNormalization(editor, (entry) =>
            normalizeNestedElement(editor, entry, () => false),
        );

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should lift element nodes that are not allowed to nest', function () {
        const editor = (
            <editor>
                <h:paragraph>
                    <h:paragraph>
                        <h:text>
                            Contrary to popular belief, Lorem Ipsum is not simply random text.
                        </h:text>
                    </h:paragraph>
                    <h:paragraph>
                        <h:paragraph>
                            <h:text>
                                <cursor />
                                It has roots in a piece of classical Latin literature from 45 BC,
                            </h:text>
                        </h:paragraph>
                    </h:paragraph>
                </h:paragraph>
                <h:paragraph>
                    <h:text>making it over 2000 years old.</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>
                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                    </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>
                        <cursor />
                        It has roots in a piece of classical Latin literature from 45 BC,
                    </h:text>
                </h:paragraph>
                <h:paragraph>
                    <h:text>making it over 2000 years old.</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        withElementNormalization(editor, (entry) =>
            normalizeNestedElement(
                editor,
                entry,
                (node) => !isElementNode(node, PARAGRAPH_NODE_TYPE),
            ),
        );

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
