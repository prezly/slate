/** @jsx jsx */

import { Editor } from 'slate';

import jsx from '../jsx';

import getNodePath from './getNodePath';
import isElementWithType from './isElementWithType';

const ELEMENT_TYPE = 'type';
const OTHER_TYPE = 'other-type';

describe('getNodePath', () => {
    it('Returns the path of matching element', () => {
        const editor = ((
            <editor>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
                <element type={OTHER_TYPE}>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </element>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
            </editor>
        ) as unknown) as Editor;

        const nodePath =
            editor.selection &&
            getNodePath(editor, {
                match: (node) => isElementWithType(node) && node.type === OTHER_TYPE,
            });

        expect(nodePath).toEqual([1]);
    });

    it('Returns null if no element matches', () => {
        const editor = ((
            <editor>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
                <element type={OTHER_TYPE}>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </element>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
            </editor>
        ) as unknown) as Editor;

        const nodePath =
            editor.selection &&
            getNodePath(editor, {
                match: (node) => isElementWithType(node) && node.type === ELEMENT_TYPE,
            });

        expect(nodePath).toBeNull();
    });
});
