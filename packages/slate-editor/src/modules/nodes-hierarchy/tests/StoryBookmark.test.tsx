/** @jsx jsx */

import { StoryBookmarkLayout } from '@prezly/slate-types';
import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / StoryBookmark', () => {
    it('should be kept after normalization', function () {
        const editor = (
            <editor>
                <h:story-bookmark
                    layout={StoryBookmarkLayout.HORIZONTAL}
                    new_tab
                    show_thumbnail
                    uuid="e4fe5597-6bfc-4db9-bd2b-c5823586b9dc"
                    story={{
                        uuid: 'f0c7c0f8-7e67-4402-b07e-4db2f8c4f439',
                    }}
                />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:story-bookmark
                    layout={StoryBookmarkLayout.HORIZONTAL}
                    new_tab
                    show_thumbnail
                    uuid="e4fe5597-6bfc-4db9-bd2b-c5823586b9dc"
                    story={{
                        uuid: 'f0c7c0f8-7e67-4402-b07e-4db2f8c4f439',
                    }}
                />
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot(this);
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
