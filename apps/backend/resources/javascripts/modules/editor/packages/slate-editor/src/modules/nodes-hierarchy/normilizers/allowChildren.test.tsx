/** @jsx hyperscript */

import { isLinkNode, isParagraphNode, isQuoteNode } from '@prezly/slate-types';
import { Editor, Transforms } from 'slate';

import { createParagraph } from '#extensions/paragraphs';

import { hyperscript } from '../../../hyperscript';

import { allowChildren } from './allowChildren';

describe('allowChildren', () => {
    it('can convert root nodes into paragraphs', () => {
        const normilizer = allowChildren(
            (node) => isParagraphNode(node),
            (editor, [node, path]) => {
                if (isLinkNode(node)) {
                    Transforms.setNodes(
                        editor,
                        createParagraph({ children: node.children as any }),
                        {
                            at: path,
                        },
                    );

                    return true;
                }

                if (isQuoteNode(node)) {
                    Transforms.setNodes(
                        editor,
                        createParagraph({ children: node.children as any }),
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
            return normilizer(editor, node, path);
        };

        const expected = (
            <editor-pure>
                <paragraph>
                    <h-text>inside paragraph</h-text>
                </paragraph>
                <paragraph>
                    <h-text>inside link</h-text>
                </paragraph>
                <paragraph>
                    <h-text>inside quote</h-text>
                </paragraph>
            </editor-pure>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
