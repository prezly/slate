/** @jsx jsx */

import { LinkNode, ParagraphNode, QuoteNode } from '@prezly/content-format';
import { Editor, Transforms } from 'slate';

import { createParagraph } from '#extensions/paragraphs';

import { jsx } from '../../../jsx';

import { allowChildren } from './allowChildren';

describe('withNodesHierarchy', () => {
    it('Can unwrap node inside list', () => {
        const normilizer = allowChildren(
            (node) => ParagraphNode.isParagraphNode(node),
            (editor, node, path) => {
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

        const original = (
            <editor
                plugins={[
                    (editor) => {
                        editor.normalizeNode = ([node, path]) => {
                            return normilizer(editor, [node as any, path]);
                        };

                        return editor;
                    },
                ]}
            >
                <link>
                    <paragraph>
                        <h-text>inside link</h-text>
                    </paragraph>
                </link>
                <blockquote>
                    <h-text>inside link</h-text>
                </blockquote>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <paragraph>
                    <h-text>inside link</h-text>
                </paragraph>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(original, { force: true });

        expect(original.children).toEqual(expected.children);
    });
});
