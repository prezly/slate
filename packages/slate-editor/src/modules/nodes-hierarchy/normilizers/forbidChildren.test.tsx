/** @jsx jsx */

import { ParagraphNode } from '@prezly/content-format';
import { Editor, Transforms } from 'slate';

import { createBlockquote } from '#extensions/blockquote';

import { jsx } from '../../../jsx';

import { forbidChildren } from './forbidChildren';

describe('forbidChildren', () => {
    it('can convert forbidden paragraph into quote', () => {
        const normilizer = forbidChildren(
            (node) => ParagraphNode.isParagraphNode(node),
            (editor, node, path) => {
                if (ParagraphNode.isParagraphNode(node)) {
                    Transforms.setNodes(
                        editor,
                        createBlockquote({ children: node.children as any }),
                        {
                            at: path,
                        },
                    );

                    return true;
                }

                return false;
            },
        );

        const editor = (
            <editor-pure>
                <paragraph>
                    <h-text>inside paragraph</h-text>
                </paragraph>
                <link>
                    <h-text>inside link</h-text>
                </link>
                <blockquote>
                    <h-text>inside quote</h-text>
                </blockquote>
            </editor-pure>
        ) as unknown as Editor;

        editor.normalizeNode = ([node, path]) => {
            return normilizer(editor, [node as any, path]);
        };

        const expected = (
            <editor-pure>
                <blockquote>
                    <h-text>inside paragraph</h-text>
                </blockquote>
                <link>
                    <h-text>inside link</h-text>
                </link>
                <blockquote>
                    <h-text>inside quote</h-text>
                </blockquote>
            </editor-pure>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
