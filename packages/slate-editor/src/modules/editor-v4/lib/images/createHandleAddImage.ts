import type { PrezlyFileInfo } from '@prezly/uploadcare';
import { toProgressPromise, UPLOADCARE_FILE_DATA_KEY, UploadcareImage } from '@prezly/uploadcare';
import type { Editor } from 'slate';

import { EventsEditor } from '../../../../modules/editor-v4-events';
import type { ImageExtensionParameters } from '../../../../modules/editor-v4-image';
import { createImage } from '../../../../modules/editor-v4-image';
import { LoaderContentType } from '../../../../modules/editor-v4-loader';
import { UploadcareEditor } from '../../../../modules/editor-v4-uploadcare';
import insertUploadingFile from '../insertUploadingFile';

import getMediaGalleryParameters from './getMediaGalleryParameters';

const createHandleAddImage = (withImages: ImageExtensionParameters) => async (editor: Editor) => {
    EventsEditor.dispatchEvent(editor, 'image-add-clicked');

    const filePromises = await UploadcareEditor.upload(editor, {
        ...getMediaGalleryParameters(withImages),
        captions: withImages.captions,
        imagesOnly: true,
        multiple: true,
    });

    if (!filePromises) {
        return;
    }

    filePromises.forEach(async (filePromise) => {
        const imageFileInfo = await insertUploadingFile<PrezlyFileInfo>(editor, {
            createElement: (fileInfo) => {
                const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                const caption: string = fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || '';
                return createImage(image.toPrezlyStoragePayload(), {
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
    });
};

export default createHandleAddImage;
