/** @jsx jsx */

import { Editor, Node } from 'slate';

import { jsx } from '../../jsx';

import {
    normalizeTableAttributes,
    normalizeRowAttributes,
    normalizeCellAttributes,
} from './normalization';

describe('normalizeTableAttributes', () => {
    it('should always enable `border: true` on table nodes', () => {
        const editor = (
            <editor>
                <h:table>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table border={true}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        editor.normalizeNode = function (entry) {
            normalizeTableAttributes(editor, entry);
        };

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('should remove empty `header: []` prop from table nodes', () => {
        const editor = (
            <editor>
                <h:table border={true} header={[]}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table border={true}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        editor.normalizeNode = function (entry) {
            normalizeTableAttributes(editor, entry);
        };

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('should normalize `header` prop order and remove duplicates', () => {
        const editor = (
            <editor>
                <h:table border={true} header={['first_row', 'first_row', 'first_column']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table border={true} header={['first_column', 'first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        editor.normalizeNode = function (entry) {
            normalizeTableAttributes(editor, entry);
        };

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('should remove unknown table props', () => {
        const editor = (
            <editor>
                {/* @ts-ignore */}
                <h:table border={true} hello="world" colspan={2} className="header">
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table border={true}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        editor.normalizeNode = function (entry) {
            normalizeTableAttributes(editor, entry);
        };

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});

describe('normalizeRowAttributes', () => {
    it('should remove unknown row props', () => {
        const editor = (
            <editor>
                <h:table>
                    {/* @ts-ignore */}
                    <h:tr title="Hello world" colspan={2} className="header">
                        <h:td>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        expect(Node.get(editor, [0, 0])).toMatchObject({ title: 'Hello world' });

        editor.normalizeNode = function (entry) {
            normalizeRowAttributes(editor, entry);
        };

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});

describe('normalizeCellAttributes', () => {
    it('should remove default values of `colspan: 1` and `rowspan: 1` props', () => {
        const editor = (
            <editor>
                <h:table>
                    <h:tr>
                        <h:td colspan={1} rowspan={2}>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td colspan={2} rowspan={1}>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td colspan={1} rowspan={1}>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td colspan={2} rowspan={2}>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td colspan={1}>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table>
                    <h:tr>
                        <h:td rowspan={2}>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td colspan={2}>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td colspan={2} rowspan={2}>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        editor.normalizeNode = function (entry) {
            normalizeCellAttributes(editor, entry);
        };

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('should remove unknown cell props', () => {
        const editor = (
            <editor>
                <h:table>
                    <h:tr>
                        {/* @ts-ignore */}
                        <h:td title="Hello world" className="header">
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>Hello world</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        expect(Node.get(editor, [0, 0, 0])).toMatchObject({ title: 'Hello world' });

        editor.normalizeNode = function (entry) {
            normalizeCellAttributes(editor, entry);
        };

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
