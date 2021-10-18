/** @jsx jsx */

import { Editor, Element } from 'slate';

import jsx from '../jsx';

import isElementWithType from './isElementWithType';
import removeNode from './removeNode';

const ELEMENT_TYPE = 'type';
const OTHER_TYPE = 'other-type';

describe('removeNode', () => {
    it('Removes the element at current cursor location', () => {
        const editor = ((
            <editor>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </element>
            </editor>
        ) as unknown) as Editor;

        const expected = ((
            <editor>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
            </editor>
        ) as unknown) as Editor;

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
        const editor = ((
            <editor>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </element>
            </editor>
        ) as unknown) as Editor;

        const expected = ((
            <editor>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </h-p>
            </editor>
        ) as unknown) as Editor;

        removeNode(editor, {
            match: (node) => isElementWithType(node) && node.type === ELEMENT_TYPE,
        });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('Does nothing when the element does not match', () => {
        const editor = ((
            <editor>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </element>
            </editor>
        ) as unknown) as Editor;

        const expected = ((
            <editor>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                </element>
                <h-p>
                    <h-text>lorem ipsum</h-text>
                </h-p>
                <element type={ELEMENT_TYPE}>
                    <h-text>lorem ipsum</h-text>
                    <cursor />
                </element>
            </editor>
        ) as unknown) as Editor;

        removeNode(editor, {
            match: (node) => isElementWithType(node) && node.type === OTHER_TYPE,
        });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
