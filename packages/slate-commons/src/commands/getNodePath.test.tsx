/** @jsx jsx */

import { isElementNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

import { jsx } from '../jsx';
import { SOME_ELEMENT_1, SOME_ELEMENT_2 } from '../test-utils';

import { getNodePath } from './getNodePath';

describe('getNodePath', () => {
    it('Returns the path of matching element', () => {
        const editor = (
            <editor>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                </h-some-element-1>
                <h-some-element-2>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-some-element-2>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                </h-some-element-1>
            </editor>
        ) as unknown as Editor;

        const nodePath =
            editor.selection &&
            getNodePath(editor, {
                match: (node) => isElementNode(node, SOME_ELEMENT_2),
            });

        expect(nodePath).toEqual([1]);
    });

    it('Returns null if no element matches', () => {
        const editor = (
            <editor>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                </h-some-element-1>
                <h-some-element-2>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-some-element-2>
                <h-some-element-1>
                    <h-text>lorem ipsum</h-text>
                </h-some-element-1>
            </editor>
        ) as unknown as Editor;

        const nodePath =
            editor.selection &&
            getNodePath(editor, {
                match: (node) => isElementNode(node, SOME_ELEMENT_1),
            });

        expect(nodePath).toBeNull();
    });
});
