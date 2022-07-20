/** @jsx jsx */

import { Alignment, ImageLayout } from '@prezly/slate-types';
import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Tables', () => {
    it('should be kept after normalization', () => {
        const editor = (
            <editor>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:text>1</h:text>
                        </h:td>
                        <h:td>
                            <h:text>2</h:text>
                        </h:td>
                        <h:td>
                            <h:text>3</h:text>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:text>4</h:text>
                        </h:td>
                        <h:td>
                            <h:text>5</h:text>
                        </h:td>
                        <h:td>
                            <h:text>6</h:text>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:text>7</h:text>
                        </h:td>
                        <h:td>
                            <h:text>8</h:text>
                        </h:td>
                        <h:td>
                            <h:text>9</h:text>
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
                            <h:text>1</h:text>
                        </h:td>
                        <h:td>
                            <h:text>2</h:text>
                        </h:td>
                        <h:td>
                            <h:text>3</h:text>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:text>4</h:text>
                        </h:td>
                        <h:td>
                            <h:text>5</h:text>
                        </h:td>
                        <h:td>
                            <h:text>6</h:text>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:text>7</h:text>
                        </h:td>
                        <h:td>
                            <h:text>8</h:text>
                        </h:td>
                        <h:td>
                            <h:text>9</h:text>
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

    it('should extract image from table cell after normalization', () => {
        const editor = (
            <editor>
                <h:table border header={['first_row']}>
                    <h:tr>
                        <h:td>
                            <h:text>1</h:text>
                        </h:td>
                        <h:td>
                            <h:text>2</h:text>
                        </h:td>
                        <h:td>
                            <h:text>3</h:text>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:text>4</h:text>
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
                            <h:text>5</h:text>
                        </h:td>
                        <h:td>
                            <h:text>6</h:text>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:text>7</h:text>
                        </h:td>
                        <h:td>
                            <h:text>8</h:text>
                        </h:td>
                        <h:td>
                            <h:text>9</h:text>
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
                            <h:text>1</h:text>
                        </h:td>
                        <h:td>
                            <h:text>2</h:text>
                        </h:td>
                        <h:td>
                            <h:text>3</h:text>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:text>4</h:text>
                        </h:td>
                        <h:td>
                            <h:text>5</h:text>
                        </h:td>
                        <h:td>
                            <h:text>6</h:text>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:text>7</h:text>
                        </h:td>
                        <h:td>
                            <h:text>8</h:text>
                        </h:td>
                        <h:td>
                            <h:text>9</h:text>
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
                            <h:text bold>
                                <cursor />1
                            </h:text>
                        </h:td>
                        <h:td>
                            <h:text>2</h:text>
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
                            <h:text>
                                <cursor />1
                            </h:text>
                        </h:td>
                        <h:td>
                            <h:text>2</h:text>
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
                            <h:text>2</h:text>
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
                            <h:text>2</h:text>
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
                            <h:text>1</h:text>
                        </h:td>
                        <h:td>
                            <h:text>2</h:text>
                        </h:td>
                        <h:td>
                            <h:text>3</h:text>
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
                            <h:text>1</h:text>
                        </h:td>
                        <h:td>
                            <h:text>2</h:text>
                        </h:td>
                        <h:td>
                            <h:text>3</h:text>
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
                            <h:text>1</h:text>
                        </h:td>
                        <h:td colspan={2}>
                            <h:text>2</h:text>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:text>3</h:text>
                        </h:td>
                        <h:td>
                            <h:text>4</h:text>
                        </h:td>
                        <h:td>
                            <h:text>5</h:text>
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
                            <h:text>1</h:text>
                        </h:td>
                        <h:td>
                            <h:text>2</h:text>
                        </h:td>
                        <h:td>
                            <h:paragraph>
                                <h:text></h:text>
                            </h:paragraph>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:text>3</h:text>
                        </h:td>
                        <h:td>
                            <h:text>4</h:text>
                        </h:td>
                        <h:td>
                            <h:text>5</h:text>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('should restore absent cells when colspan exceeds real cells', () => {
        const editor = (
            <editor>
                <h:table border>
                    <h:tr>
                        <h:td>
                            <h:text>1</h:text>
                        </h:td>
                        <h:td colspan={3}>
                            <h:text>2</h:text>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:text>3</h:text>
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
                            <h:text>1</h:text>
                        </h:td>
                        <h:td>
                            <h:text>2</h:text>
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
                            <h:text>3</h:text>
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

        debugger;
        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });

    it('should remove rowspan', () => {
        const editor = (
            <editor>
                <h:table border>
                    <h:tr>
                        <h:td rowspan={2}>
                            <h:text>1</h:text>
                        </h:td>
                        <h:td colspan={2}>
                            <h:text>2</h:text>
                        </h:td>
                    </h:tr>
                    <h:tr>
                        <h:td>
                            <h:text>4</h:text>
                        </h:td>
                        <h:td>
                            <h:text>5</h:text>
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
                            <h:text>1</h:text>
                        </h:td>
                        <h:td>
                            <h:text>2</h:text>
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
                            <h:text>4</h:text>
                        </h:td>
                        <h:td>
                            <h:text>5</h:text>
                        </h:td>
                    </h:tr>
                </h:table>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected.children);
    });
});
