import { EditorCommands } from '@prezly/slate-commons';
import { type PrezlyFileInfo, toProgressPromise, UploadcareImage } from '@prezly/uploadcare';
import { Editor, Transforms } from 'slate';

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

        const initialFileInfo = UploadcareImage.createFromPrezlyStoragePayload(imageNode.file);

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
                return {
                    image: {
                        ...imageNode,
                        file: image.toPrezlyStoragePayload(),
                    },
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
