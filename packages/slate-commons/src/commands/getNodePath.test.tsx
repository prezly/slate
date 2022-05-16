/** @jsx jsx */

import { isElementNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

import { jsx, HEADING_1_NODE_TYPE, HEADING_2_NODE_TYPE } from '../jsx';

import { getNodePath } from './getNodePath';

describe('getNodePath', () => {
    it('Returns the path of matching element', () => {
        const editor = (
            <editor>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
                <h:heading-2>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:heading-2>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
            </editor>
        ) as unknown as Editor;

        const nodePath =
            editor.selection &&
            getNodePath(editor, {
                match: (node) => isElementNode(node, HEADING_2_NODE_TYPE),
            });

        expect(nodePath).toEqual([1]);
    });

    it('Returns null if no element matches', () => {
        const editor = (
            <editor>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
                <h:heading-2>
                    <h:text>lorem ipsum</h:text>
                    <cursor />
                </h:heading-2>
                <h:heading-1>
                    <h:text>lorem ipsum</h:text>
                </h:heading-1>
            </editor>
        ) as unknown as Editor;

        const nodePath =
            editor.selection &&
            getNodePath(editor, {
                match: (node) => isElementNode(node, HEADING_1_NODE_TYPE),
            });

        expect(nodePath).toBeNull();
    });
});
