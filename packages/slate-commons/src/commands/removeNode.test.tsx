/** @jsx jsx */
import { isElementNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Element } from 'slate';

import { jsx, HEADING_1_NODE_TYPE, HEADING_2_NODE_TYPE } from '../jsx';

import { removeNode } from './removeNode';

describe('removeNode', () => {
    it('Removes the element at current cursor location', () => {
        const editor = (
            <editor>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:heading-1>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        if (editor.selection) {
            removeNode(editor, {
                at: editor.selection,
                match: (node) => Element.isElement(node),
            });
        }

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Removes the matching element at current cursor location', () => {
        const editor = (
            <editor>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:heading-1>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        removeNode(editor, {
            match: (node) => isElementNode(node, HEADING_1_NODE_TYPE),
        });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Does nothing when the element does not match', () => {
        const editor = (
            <editor>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:heading-1>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
                <h:paragraph>
                    <h:text>lorem ipsum</h:text>
                </h:paragraph>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:heading-1>
            </editor>
        ) as unknown as Editor;

        removeNode(editor, {
            match: (node) => isElementNode(node, HEADING_2_NODE_TYPE),
        });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
