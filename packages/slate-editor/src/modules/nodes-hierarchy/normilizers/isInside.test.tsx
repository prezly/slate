/** @jsx jsx */

import type { TextNode } from '@prezly/slate-types';
import { isParagraphNode } from '@prezly/slate-types';
import { Editor, Text, Transforms } from 'slate';

import { jsx } from '../../../jsx';

import { isInside } from './isInside';

describe('isInside', () => {
    it('can set text node marks only inside paragraph', () => {
        const normilizer = isInside(
            (node) => isParagraphNode(node),
            (editor, [node]) => {
                if (Text.isText(node)) {
                    Transforms.setNodes<TextNode>(
                        editor,
                        { bold: true, italic: true },
                        { match: (n) => n === node },
                    );

                    return true;
                }

                return false;
            },
        );

        const editor = (
            <editor-pure>
                <h:paragraph>
                    <h:text>
                        <cursor />
                        inside paragraph
                    </h:text>
                </h:paragraph>
                <blockquote>
                    <h:text>inside quote</h:text>
                </blockquote>
            </editor-pure>
        ) as unknown as Editor;

        editor.normalizeNode = ([, path]) => {
            return normilizer(editor, path);
        };

        const expected = (
            <editor-pure>
                <h:paragraph>
                    <h:text bold italic>
                        <cursor />
                        inside paragraph
                    </h:text>
                </h:paragraph>
                <blockquote>
                    <h:text>inside quote</h:text>
                </blockquote>
            </editor-pure>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
