import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareImage } from '@prezly/uploadcare';
import type { Editor } from 'slate';

import type { ImageExtensionConfiguration } from '#extensions/image';
import { createImage, getCurrentImageNodeEntry } from '#extensions/image';
import { LoaderContentType } from '#extensions/loader';
import { EventsEditor } from '#modules/events';
import { UploadcareEditor } from '#modules/uploadcare';

import { insertUploadingFile } from '../insertUploadingFile';

import { getMediaGalleryParameters } from './getMediaGalleryParameters';

export function createImageReplaceHandler(params: ImageExtensionConfiguration) {
    return async function (editor: Editor) {
        const currentNodeEntry = getCurrentImageNodeEntry(editor);
        if (!currentNodeEntry) {
            return;
        }

        EventsEditor.dispatchEvent(editor, 'image-edit-clicked');
        const [imageElement] = currentNodeEntry;

        const filePromises = await UploadcareEditor.upload(editor, {
            ...getMediaGalleryParameters(params),
            captions: params.captions,
            imagesOnly: true,
            multiple: false,
        });

        if (!filePromises) {
            return;
        }

        const imageFileInfo = await insertUploadingFile<PrezlyFileInfo>(editor, {
            createElement(fileInfo) {
                const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                const caption: string = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
                return createImage({
                    file: image.toPrezlyStoragePayload(),
                    children: caption ? [{ text: caption }] : imageElement.children,
                    href: imageElement.href,
                    layout: imageElement.layout,
                    new_tab: imageElement.new_tab,
                    width: imageElement.width,
                });
            },
            filePromise: toProgressPromise(filePromises[0]),
            loaderContentType: LoaderContentType.IMAGE,
            loaderMessage: 'Uploading Image',
        });

        if (!imageFileInfo) {
            return;
        }

        EventsEditor.dispatchEvent(editor, 'image-edited', {
            description: imageFileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '',
            mimeType: imageFileInfo.mimeType,
            size: imageFileInfo.size,
            uuid: imageFileInfo.uuid,
        });
    };
}
