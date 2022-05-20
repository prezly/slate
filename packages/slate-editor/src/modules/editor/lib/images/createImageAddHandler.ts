import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareImage } from '@prezly/uploadcare';
import type { Editor } from 'slate';

import type { ImageExtensionParameters } from '#extensions/image';
import { createImage } from '#extensions/image';
import { LoaderContentType } from '#extensions/loader';
import { EventsEditor } from '#modules/events';
import { UploadcareEditor } from '#modules/uploadcare';

import { insertUploadingFile } from '../insertUploadingFile';

import { getMediaGalleryParameters } from './getMediaGalleryParameters';

export function createImageAddHandler(params: ImageExtensionParameters) {
    return async function (editor: Editor): Promise<void> {
        EventsEditor.dispatchEvent(editor, 'image-add-clicked');

        const filePromises = await UploadcareEditor.upload(editor, {
            ...getMediaGalleryParameters(params),
            captions: params.captions,
            imagesOnly: true,
            multiple: true,
        });

        if (!filePromises) {
            return;
        }

        await Promise.all(
            filePromises.map(async (filePromise) => {
                const imageFileInfo = await insertUploadingFile<PrezlyFileInfo>(editor, {
                    createElement(fileInfo) {
                        const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                        const caption: string = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
                        return createImage({
                            file: image.toPrezlyStoragePayload(),
                            children: [{ text: caption }],
                        });
                    },
                    ensureEmptyParagraphAfter: true,
                    filePromise: toProgressPromise(filePromise),
                    loaderContentType: LoaderContentType.IMAGE,
                    loaderMessage: 'Uploading Image',
                });

                if (!imageFileInfo) {
                    return;
                }

                EventsEditor.dispatchEvent(editor, 'image-added', {
                    description: imageFileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '',
                    isPasted: false,
                    mimeType: imageFileInfo.mimeType,
                    size: imageFileInfo.size,
                    uuid: imageFileInfo.uuid,
                });
            }),
        );
    };
}
