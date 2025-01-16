/* eslint-disable react/no-children-prop */
/** @jsx hyperscript */

import { Alignment } from '@prezly/slate-types';
import { Editor } from 'slate';

import { hyperscript } from '../../../hyperscript';

/**
 * These tests are skipped.
 * Reverted the fix for performance reasons. See CARE-1379 and CARE-1320
 */
describe('nodes-hierarchy / Any Node', () => {
    it('should remove nodes without children', function () {
        this.skip();

        const editor = (
            <editor>
                <h:ol align={Alignment.LEFT}>
                    <h:li children={[]} />
                    <h:li>
                        <h:li-text>
                            <h:text>Second</h:text>
                        </h:li-text>
                    </h:li>
                    <h:li>
                        <h:li-text>
                            <h:text>Third</h:text>
                        </h:li-text>
                    </h:li>
                </h:ol>
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:ol align={Alignment.LEFT}>
                    <h:li>
                        <h:li-text>
                            <h:text>Second</h:text>
                        </h:li-text>
                    </h:li>
                    <h:li>
                        <h:li-text>
                            <h:text>Third</h:text>
                        </h:li-text>
                    </h:li>
                </h:ol>
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });

    it('should remove all nodes but leave editor with one paragraph', function () {
        this.skip();

        const editor = (
            <editor>
                <h:ol align={Alignment.LEFT}>
                    <h:li>
                        <h:li-text>
                            <h:text children={[]} />
                        </h:li-text>
                    </h:li>
                    <h:li>
                        <h:li-text children={[]} />
                    </h:li>
                    <h:li children={[]} />
                </h:ol>

                <h:ul children={[]} />
                <h:paragraph children={[]} align={Alignment.CENTER} />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:paragraph align={Alignment.CENTER} />
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
