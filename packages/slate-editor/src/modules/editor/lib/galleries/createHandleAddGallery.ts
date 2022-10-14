import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { awaitUploads, UPLOADCARE_FILE_DATA_KEY, UploadcareImage } from '@prezly/uploadcare';
import type { Editor } from 'slate';

import type { GalleriesExtensionConfiguration } from '#extensions/galleries';
import { createGallery } from '#extensions/galleries';
import { LoaderContentType } from '#extensions/loader';
import { EventsEditor } from '#modules/events';
import { UploadcareEditor } from '#modules/uploadcare';
import { UPLOAD_MULTIPLE_IMAGES_SOME_ERROR_MESSAGE } from '#modules/uploadcare';

import { insertUploadingFile } from '../insertUploadingFile';

import { getMediaGalleryParameters } from './getMediaGalleryParameters';

export function createHandleAddGallery(config: GalleriesExtensionConfiguration) {
    return async function (editor: Editor) {
        const filePromises = await UploadcareEditor.upload(editor, {
            ...getMediaGalleryParameters(config),
            captions: true,
            imagesOnly: true,
            multiple: true,
        });

        if (!filePromises) {
            return;
        }

        await insertUploadingFile<PrezlyFileInfo[]>(editor, {
            createElement: (fileInfos) => {
                const images = fileInfos.map((fileInfo) => {
                    const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                    return {
                        caption: fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '',
                        file: image.toPrezlyStoragePayload(),
                    };
                });
                return createGallery({ images });
            },
            filePromise: awaitUploads(filePromises).then(({ failedUploads, successfulUploads }) => {
                failedUploads.forEach((error) => {
                    EventsEditor.dispatchEvent(editor, 'error', error);
                });

                if (failedUploads.length > 0) {
                    EventsEditor.dispatchEvent(editor, 'notification', {
                        children: UPLOAD_MULTIPLE_IMAGES_SOME_ERROR_MESSAGE,
                        type: 'error',
                    });
                }

                return successfulUploads;
            }),
            loaderContentType: LoaderContentType.GALLERY,
            loaderMessage: 'Uploading Gallery',
        });
    };
}
