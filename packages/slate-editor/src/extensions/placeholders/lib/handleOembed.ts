import type { OEmbedInfo } from '@prezly/sdk';
import { toProgressPromise, UploadcareImage } from '@prezly/uploadcare';
import uploadcare from '@prezly/uploadcare-widget';
import type { SlateEditor } from '@udecode/plate-common';

import { createEmbed } from '#extensions/embed';
import { createImage } from '#extensions/image';
import { createVideoBookmark } from '#extensions/video';
import { createWebBookmark } from '#extensions/web-bookmark';

import { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager } from '../PlaceholdersManager';

import { createPlaceholder } from './createPlaceholder';
import { replacePlaceholder } from './replacePlaceholder';

type Params = {
    url: string;
    oembed: OEmbedInfo;
};

type Options = {
    routeImages?: boolean;
    routeVideos?: boolean;
    routeWebBookmarks?: boolean;
    select?: boolean;
};

export function handleOembed(
    editor: SlateEditor,
    placeholder: PlaceholderNode,
    { url, oembed }: Params,
    {
        routeImages = false,
        routeVideos = false,
        routeWebBookmarks = false,
        select = false,
    }: Options = {},
): void {
    // [DEV-7592] Auto-route photo-type embeds to Image nodes
    if (routeImages && isEmbedType(oembed, 'photo')) {
        const filePromise = isUploadcareUrl(oembed.url)
            ? // Reuse existing upload if it's already on the Uploadcare CDN
              uploadcare.fileFrom('uploaded', oembed.url)
            : // Upload an external file to the Uploadcare CDN
              uploadcare.fileFrom('url', oembed.url);

        const loading = toProgressPromise(filePromise).then((fileInfo) => {
            const file = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
            const image = createImage({
                file: file.toPrezlyStoragePayload(),
            });
            return { image, operation: 'add' as const, trigger: 'oembed' as const };
        });

        const imagePlaceholder = createPlaceholder({ type: PlaceholderNode.Type.IMAGE });
        replacePlaceholder(editor, placeholder, imagePlaceholder, { select });
        PlaceholdersManager.register(imagePlaceholder.type, imagePlaceholder.uuid, loading);

        return;
    }

    // [DEV-7592] Auto-route video-type embeds to Video nodes
    if (routeVideos && isEmbedType(oembed, 'video')) {
        replacePlaceholder(editor, placeholder, createVideoBookmark({ url, oembed }), { select });
        return;
    }

    // [DEV-7592] Auto-route link-type embeds to Web Bookmark nodes
    if (routeWebBookmarks && isEmbedType(oembed, 'link')) {
        replacePlaceholder(editor, placeholder, createWebBookmark({ url, oembed }), { select });
        return;
    }

    replacePlaceholder(editor, placeholder, createEmbed({ url, oembed }), { select });
}

function isUploadcareUrl(url: string) {
    return (
        url.startsWith('https://cdn.uc.assets.prezly.com/') ||
        url.startsWith('https://ucarecdn.com/')
    );
}

function isEmbedType<T extends 'photo' | 'video' | 'link'>(
    oembed: OEmbedInfo | undefined,
    type: T,
): oembed is OEmbedInfo & { type: T } {
    return oembed?.type === type;
}
