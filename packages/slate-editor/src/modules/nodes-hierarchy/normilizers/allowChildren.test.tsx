/** @jsx jsx */

import { LinkNode, ParagraphNode, QuoteNode } from '@prezly/content-format';
import { Editor, Transforms, Element } from 'slate';

import { createParagraph } from '#extensions/paragraphs';

import { jsx } from '../../../jsx';

import { allowChildren } from './allowChildren';

describe('allowChildren', () => {
    it('can convert root nodes into paragraphs', () => {
        const normilizer = allowChildren(
            (node) => ParagraphNode.isParagraphNode(node),
            (editor, [node, path]) => {
                if (LinkNode.isLinkNode(node)) {
                    Transforms.setNodes(
                        editor,
                        createParagraph({ children: node.children as any }),
                        {
                            at: path,
                        },
                    );

                    return true;
                }

                if (QuoteNode.isQuoteNode(node)) {
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
            if (!Element.isElement(node)) {
                return false;
            }

            return normilizer(editor, [node as any, path]);
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
