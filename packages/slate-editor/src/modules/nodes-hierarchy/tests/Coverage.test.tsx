/** @jsx jsx */

import { CoverageLayout } from '@prezly/slate-types';
import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Coverage', () => {
    it('should be kept after normalization', () => {
        const editor = (
            <editor>
                <coverage
                    coverage={{ id: 1 }}
                    layout={CoverageLayout.HORIZONTAL}
                    new_tab
                    show_thumbnail
                    uuid="cfff4936-22bf-4c9a-81aa-cbf2f5fd6192"
                />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <coverage
                    coverage={{ id: 1 }}
                    layout={CoverageLayout.HORIZONTAL}
                    new_tab
                    show_thumbnail
                    uuid="cfff4936-22bf-4c9a-81aa-cbf2f5fd6192"
                />
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
