/** @jsx hyperscript */

import { Alignment, ImageLayout } from '@prezly/slate-types';
import { Editor } from 'slate';

import { hyperscript } from '../../../hyperscript';

describe('nodes-hierarchy / Tables', () => {
    it('should be kept after normalization', function () {
        const editor = (
            <editor>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>7</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>8</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph align={Alignment.CENTER}>
                                <h:text>9</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>7</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>8</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph align={Alignment.CENTER}>
                                <h:text>9</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should remove table when it has no rows', () => {
        const editor = (
            <editor>
                <h:table border />
                <h:table border header={['first_row']}>
                    <h:paragraph>
                        <h:text>Inside</h:text>
                    </h:paragraph>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph>
                    <h:text>Inside</h:text>
                </h:paragraph>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should convert text to paragraph inside cells', () => {
        const editor = (
            <editor>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:text bold>1</h:text>
                        </h:td>
                        <h:td>
                            <h:text>2</h:text>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('should extract image from table cell after normalization', () => {
        const editor = (
            <editor>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:image
                                align={Alignment.CENTER}
                                href=""
                                layout={ImageLayout.CONTAINED}
                                new_tab
                                width="100%"
                                file={{
                                    version: 2,
                                    uuid: 'c849afb1-57cc-48c2-ab31-10b5e1555a33',
                                    filename:
                                        'png-transparent-pink-cross-stroke-ink-brush-pen-red-ink-brush-ink-leave-the-material-text.png',
                                    mime_type: 'image/png',
                                    size: 41346,
                                    original_width: 920,
                                    original_height: 900,
                                    effects: [],
                                }}
                            >
                                <h:text>Caption</h:text>
                            </h:image>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>7</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>8</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>9</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:image
                    align={Alignment.CENTER}
                    href=""
                    layout={ImageLayout.CONTAINED}
                    new_tab
                    width="100%"
                    file={{
                        version: 2,
                        uuid: 'c849afb1-57cc-48c2-ab31-10b5e1555a33',
                        filename:
                            'png-transparent-pink-cross-stroke-ink-brush-pen-red-ink-brush-ink-leave-the-material-text.png',
                        mime_type: 'image/png',
                        size: 41346,
                        original_width: 920,
                        original_height: 900,
                        effects: [],
                    }}
                >
                    <h:text>Caption</h:text>
                </h:image>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>6</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>7</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>8</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>9</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should remove bold mark when text is inside table cell', () => {
        const editor = (
            <editor>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text bold>
                                    <cursor />1
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>
                                    <cursor />1
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should remove bold mark when text is inside paragraph inside table cell', () => {
        const editor = (
            <editor>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text bold>
                                    <cursor />1
                                </h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('should remove empty row', () => {
        const editor = (
            <editor>
                <h:table border>
                    <h:tr></h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr></h:tr>
                    <h:tr></h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table border>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('should remove colspan', () => {
        const editor = (
            <editor>
                <h:table border>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td colspan={2}>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table border>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('should insert absent cells when colspan exceeds real cells', () => {
        const editor = (
            <editor>
                <h:table border>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td colspan={3}>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table border>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>3</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('should remove rowspan', () => {
        const editor = (
            <editor>
                <h:table border>
                    <h:tr>
                        <h:td rowspan={2}>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td colspan={2}>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:table border>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text>1</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>2</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>4</h:text>
                            </h:paragraph>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text>5</h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
