/** @jsx jsx */

import { StoryAlignment, StoryAppearance } from '@prezly/sdk';
import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / StoryEmbed', () => {
    it('should be kept after normalization', () => {
        const editor = (
            <editor>
                <h:story-embed
                    appearance={StoryAppearance.FULL}
                    position={StoryAlignment.CENTER}
                    story={{
                        uuid: 'f0c7c0f8-7e67-4402-b07e-4db2f8c4f439',
                    }}
                />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:story-embed
                    appearance={StoryAppearance.FULL}
                    position={StoryAlignment.CENTER}
                    story={{
                        uuid: 'f0c7c0f8-7e67-4402-b07e-4db2f8c4f439',
                    }}
                />
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
