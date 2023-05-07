/** @jsx jsx */

import { GalleryImageSize, GalleryLayout, GalleryPadding } from '@prezly/slate-types';
import { Editor } from 'slate';

import { jsx } from '../../../jsx';

describe('nodes-hierarchy / Gallery', () => {
    it('should be kept after normalization', function () {
        const editor = (
            <editor>
                <h:gallery
                    uuid={'d697805c-7e8a-4627-b919-59097fbce50a'}
                    layout={GalleryLayout.CONTAINED}
                    padding={GalleryPadding.M}
                    thumbnail_size={GalleryImageSize.L}
                    images={[
                        {
                            caption: 'one',
                            file: {
                                version: 2,
                                uuid: 'e4e225e9-fa83-4613-918a-66cd2efc3b2b',
                                filename: 'grapefruit-slice-332-332 (1).jpg',
                                mime_type: 'image/jpeg',
                                size: 18122,
                                original_width: 332,
                                original_height: 332,
                                effects: [],
                            },
                        },
                        {
                            caption: 'two',
                            file: {
                                version: 2,
                                uuid: '0752828b-5595-41c8-b8a0-4b0c8abe8d8a',
                                filename: 'best-fishes.png',
                                mime_type: 'image/png',
                                size: 851619,
                                original_width: 870,
                                original_height: 870,
                                effects: [],
                            },
                        },
                    ]}
                />
            </editor>
        ) as unknown as Editor;

        const expected = (
            <editor>
                <h:gallery
                    uuid={'d697805c-7e8a-4627-b919-59097fbce50a'}
                    layout={GalleryLayout.CONTAINED}
                    padding={GalleryPadding.M}
                    thumbnail_size={GalleryImageSize.L}
                    images={[
                        {
                            caption: 'one',
                            file: {
                                version: 2,
                                uuid: 'e4e225e9-fa83-4613-918a-66cd2efc3b2b',
                                filename: 'grapefruit-slice-332-332 (1).jpg',
                                mime_type: 'image/jpeg',
                                size: 18122,
                                original_width: 332,
                                original_height: 332,
                                effects: [],
                            },
                        },
                        {
                            caption: 'two',
                            file: {
                                version: 2,
                                uuid: '0752828b-5595-41c8-b8a0-4b0c8abe8d8a',
                                filename: 'best-fishes.png',
                                mime_type: 'image/png',
                                size: 851619,
                                original_width: 870,
                                original_height: 870,
                                effects: [],
                            },
                        },
                    ]}
                />
            </editor>
        ) as unknown as Editor;

        Editor.normalize(editor, { force: true });

        expect(editor.children).toMatchSnapshot(this);
        expect(editor.children).toEqual(expected.children);
        expect(editor.selection).toEqual(expected.selection);
    });
});
