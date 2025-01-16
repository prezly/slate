/** @jsx hyperscript */

import { Campaign } from '@prezly/sdk';
import { Editor } from 'slate';

import { hyperscript } from '../../../hyperscript';

describe('nodes-hierarchy / StoryEmbed', () => {
    it('should be kept after normalization', function () {
        const editor = (
            <editor>
                <h:story-embed
                    appearance={Campaign.StoryAppearance.FULL}
                    header_footer={Campaign.StoryHeaderFooter.NONE}
                    position={Campaign.StoryAlignment.CENTER}
                    story={{
                        uuid: 'f0c7c0f8-7e67-4402-b07e-4db2f8c4f439',
                    }}
                />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:story-embed
                    appearance={Campaign.StoryAppearance.FULL}
                    header_footer={Campaign.StoryHeaderFooter.NONE}
                    position={Campaign.StoryAlignment.CENTER}
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
