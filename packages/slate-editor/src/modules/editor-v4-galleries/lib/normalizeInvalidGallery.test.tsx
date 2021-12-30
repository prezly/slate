/** @jsx jsx */

import type { GalleryNode, ParagraphNode } from '@prezly/slate-types';
import {
    GALLERY_NODE_TYPE,
    GalleryImageSize,
    GalleryLayout,
    GalleryPadding,
    PARAGRAPH_NODE_TYPE,
} from '@prezly/slate-types';
import { Editor } from 'slate';
import { omit } from 'lodash-es';

import { createEditorWithChildren, uploadedImage, withNormalization } from '../../tests';

import { normalizeInvalidGallery } from './normalizeInvalidGallery';

const EMPTY_TEXT = { text: '' };

describe('normalizeInvalidGallery', () => {
    it('it should remove malformed GalleryNode elements', function () {
        const input = [
            { type: PARAGRAPH_NODE_TYPE, children: [{ text: 'Hello' }] } as ParagraphNode,
            {
                type: GALLERY_NODE_TYPE,
                uuid: 'e06cb0ed-21a1-4c29-8211-484ccad6d05a',
                layout: GalleryLayout.CONTAINED,
                padding: GalleryPadding.M,
                thumbnail_size: GalleryImageSize.M,
                images: [
                    { caption: 'Hello', file: uploadedImage },
                    { caption: 'World', file: uploadedImage },
                ],
                children: [EMPTY_TEXT],
            } as GalleryNode,
            {
                type: GALLERY_NODE_TYPE,
                uuid: 'a06cb0ed-21a1-4c29-8211-484ccad6d05a',
                layout: GalleryLayout.CONTAINED,
                padding: GalleryPadding.M,
                thumbnail_size: GalleryImageSize.M,
                images: [
                    { caption: 'Hello', file: omit(uploadedImage, 'uuid') }, // corrupted file
                    { caption: 'World', file: uploadedImage },
                ],
                children: [EMPTY_TEXT],
            } as GalleryNode,
            {
                type: GALLERY_NODE_TYPE,
                // uuid: uuid.v4(), <-- without `uuid`
                layout: GalleryLayout.CONTAINED,
                padding: GalleryPadding.M,
                thumbnail_size: GalleryImageSize.M,
                images: [
                    { caption: 'Hello', file: uploadedImage },
                    { caption: 'World', file: uploadedImage },
                ],
                children: [EMPTY_TEXT],
            } as GalleryNode,
            {
                type: GALLERY_NODE_TYPE,
                uuid: 'a06cb0ed-21a1-4c29-8211-484ccad6d05a',
                layout: GalleryLayout.CONTAINED,
                padding: '?', // <-- invalid
                thumbnail_size: GalleryImageSize.M,
                images: [{ caption: 'World', file: uploadedImage }],
                children: [EMPTY_TEXT],
            } as any as GalleryNode,
        ];

        const expected = [
            { type: PARAGRAPH_NODE_TYPE, children: [{ text: 'Hello' }] } as ParagraphNode,
            {
                type: GALLERY_NODE_TYPE,
                uuid: 'e06cb0ed-21a1-4c29-8211-484ccad6d05a',
                layout: GalleryLayout.CONTAINED,
                padding: GalleryPadding.M,
                thumbnail_size: GalleryImageSize.M,
                images: [
                    { caption: 'Hello', file: uploadedImage },
                    { caption: 'World', file: uploadedImage },
                ],
                children: [EMPTY_TEXT],
            } as GalleryNode,
        ];

        const editor = withNormalization(createEditorWithChildren(input), (entry) =>
            normalizeInvalidGallery(editor, entry),
        );

        Editor.normalize(editor, { force: true });

        expect(editor.children).toEqual(expected);
    });
});
