/** @jsx jsx */

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
});
