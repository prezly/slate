/** @jsx jsx */

import { Alignment, ImageLayout } from '@prezly/slate-types';
import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Image', () => {
    it('should be kept after normalization', () => {
        const editor = (
            <editor>
                <h:image-candidate href="image-candidate-href" src="image-candidate-src" />
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
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:image-candidate href="image-candidate-href" src="image-candidate-src" />
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
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot();
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
