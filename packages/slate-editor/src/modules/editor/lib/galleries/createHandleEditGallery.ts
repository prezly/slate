import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { awaitUploads, UPLOADCARE_FILE_DATA_KEY, UploadcareImage } from '@prezly/uploadcare';
import type { Editor } from 'slate';

import type { GalleriesExtensionConfiguration } from '#extensions/galleries';
import { createGallery, getCurrentGalleryNodeEntry } from '#extensions/galleries';
import { LoaderContentType } from '#extensions/loader';
import { EventsEditor } from '#modules/events';
import { UploadcareEditor } from '#modules/uploadcare';
import { UPLOAD_MULTIPLE_IMAGES_SOME_ERROR_MESSAGE } from '#modules/uploadcare';

import { insertUploadingFile } from '../insertUploadingFile';

import { getMediaGalleryParameters } from './getMediaGalleryParameters';

export function createHandleEditGallery(config: GalleriesExtensionConfiguration) {
    return async function (editor: Editor) {
        const galleryNodeEntry = getCurrentGalleryNodeEntry(editor);

        if (!galleryNodeEntry) {
            return;
        }

        const [gallery] = galleryNodeEntry;
        const files = gallery.images.map(({ caption, file }) => {
            const uploadcareImage = UploadcareImage.createFromPrezlyStoragePayload(file);
            uploadcareImage[UPLOADCARE_FILE_DATA_KEY] = { caption };
            return uploadcareImage;
        });

        const filePromises = await UploadcareEditor.upload(editor, {
            ...getMediaGalleryParameters(config),
            captions: true,
            files,
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
                return createGallery({ ...gallery, images });
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
