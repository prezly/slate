import { EditorCommands } from '@prezly/slate-commons';
import {
    type PrezlyFileInfo,
    toProgressPromise,
    UPLOADCARE_FILE_DATA_KEY,
    UploadcareImage,
} from '@prezly/uploadcare';
import { Editor, Node, Transforms } from 'slate';

import type { ImageExtensionConfiguration } from '#extensions/image';
import { getCurrentImageNodeEntry } from '#extensions/image';
import { createPlaceholder, PlaceholderNode, PlaceholdersManager } from '#extensions/placeholders';
import { EventsEditor } from '#modules/events';
import { UploadcareEditor } from '#modules/uploadcare';

import { getMediaGalleryParameters } from './getMediaGalleryParameters';

export function createImageEditHandler(params: ImageExtensionConfiguration) {
    return async function (editor: Editor) {
        const [imageNode, path] = getCurrentImageNodeEntry(editor) ?? [];
        if (!imageNode || !path) {
            return;
        }

        EventsEditor.dispatchEvent(editor, 'image-edit-clicked');

        // TODO: Consider changing this code in a way to preserve the image caption as-is,
        //       otherwise we lose formatting & inline nodes after this code is executed.
        const originalCaption = Node.string(imageNode);

        const initialFileInfo = UploadcareImage.createFromPrezlyStoragePayload(imageNode.file);
        initialFileInfo[UPLOADCARE_FILE_DATA_KEY] = { caption: originalCaption };

        const [upload] =
            (await UploadcareEditor.upload(editor, {
                ...getMediaGalleryParameters(params),
                captions: params.captions,
                files: [initialFileInfo],
                imagesOnly: true,
                multiple: false,
            })) ?? [];

        if (!upload) {
            return;
        }

        const placeholder = createPlaceholder({ type: PlaceholderNode.Type.IMAGE });

        PlaceholdersManager.register(
            placeholder.type,
            placeholder.uuid,
            toProgressPromise(upload).then((fileInfo: PrezlyFileInfo) => {
                const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                const caption: string =
                    fileInfo[UPLOADCARE_FILE_DATA_KEY]?.caption || originalCaption || '';

                return {
                    file: image.toPrezlyStoragePayload(),
                    caption,
                    operation: 'edit',
                };
            }),
        );

        Editor.withoutNormalizing(editor, () => {
            // Remove image caption nodes, as placeholders are voids and cannot have children.
            // We have to do this, as Slate automatically unwraps void node children, if any.
            // This converts image captions to sibling paragraphs image editing operations.
            EditorCommands.removeChildren(editor, [imageNode, path]);

            Transforms.setNodes(editor, placeholder, { at: path, voids: true });
        });
    };
}
