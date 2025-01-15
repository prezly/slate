import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement, EditorCommands } from '@prezly/slate-commons';
import type { ImageNode } from '@prezly/slate-types';
import { IMAGE_NODE_TYPE, isImageNode } from '@prezly/slate-types';
import { toProgressPromise, UploadcareImage } from '@prezly/uploadcare';
import { noop } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate-common';
import { isHotkey } from 'is-hotkey';
import React from 'react';
import { Path } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { isDeletingEvent, isDeletingEventBackward } from '#lib';

import { createParagraph } from '#extensions/paragraphs';
import { createPlaceholder, PlaceholderNode, PlaceholdersManager } from '#extensions/placeholders';
import { composeElementDeserializer } from '#modules/html-deserialization';

import { ImageElement } from './components';
import {
    createImage,
    getAncestorAnchor,
    normalizeRedundantImageAttributes,
    parseSerializedElement,
    toFilePromise,
} from './lib';
import type { ImageExtensionConfiguration } from './types';
import { withImages } from './withImages';

const HOLDING_BACKSPACE_THRESHOLD = 100;

let lastBackspaceTimestamp = 0;

interface Parameters extends ImageExtensionConfiguration {
    onCrop?: (editor: SlateEditor, original: ImageNode) => void;
    onCropped?: (editor: SlateEditor, updated: ImageNode) => void;
    onRemoved?: (editor: SlateEditor, element: ImageNode) => void;
    onReplace?: (editor: SlateEditor, original: ImageNode) => void;
    onReplaced?: (editor: SlateEditor, updated: ImageNode) => void;
}

export const EXTENSION_ID = 'ImageExtension';

export const ImageExtension = ({
    onCrop = noop,
    onCropped = noop,
    onRemoved = noop,
    onReplace = noop,
    onReplaced = noop,
    withAlignmentOptions = false,
    withCaptions = false,
    withLayoutOptions = false,
    withMediaGalleryTab = false,
    withNewTabOption = true,
    withSizeOptions = false,
}: Parameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [IMAGE_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            IMG: (element: HTMLElement): PlaceholderNode | undefined => {
                const imageElement = element as HTMLImageElement;
                const anchorElement = getAncestorAnchor(imageElement);

                function upload(src: string, alt?: string, href?: string) {
                    const filePromise = toFilePromise(src);

                    if (!filePromise) {
                        return Promise.reject(
                            new Error(`Unable to upload an image from the given URL: ${src}`),
                        );
                    }

                    return toProgressPromise(filePromise).then((fileInfo) => {
                        const image = UploadcareImage.createFromUploadcareWidgetPayload(fileInfo);
                        return {
                            image: createImage({
                                file: image.toPrezlyStoragePayload(),
                                href,
                                children: [{ text: alt ?? '' }],
                            }),
                            operation: 'add' as const,
                            trigger: 'paste-html' as const,
                        };
                    });
                }

                const placeholder = createPlaceholder({
                    type: PlaceholderNode.Type.IMAGE,
                });

                const uploading = upload(
                    imageElement.src,
                    imageElement.alt ?? imageElement.title,
                    anchorElement && !anchorElement.textContent ? anchorElement.href : undefined,
                );

                PlaceholdersManager.register(placeholder.type, placeholder.uuid, uploading);

                return placeholder;
            },
        }),
    },
    isRichBlock: isImageNode,
    isVoid: (node) => {
        if (isImageNode(node)) {
            return !withCaptions;
        }
        return false;
    },
    normalizeNode: normalizeRedundantImageAttributes,
    onKeyDown: (event, editor) => {
        if (!withCaptions) {
            return;
        }

        if (isHotkey('enter', event.nativeEvent)) {
            const nodeEntry = EditorCommands.getCurrentNodeEntry(editor);
            if (nodeEntry && isImageNode(nodeEntry[0])) {
                event.preventDefault();

                const nextPath = Path.next(nodeEntry[1]);
                EditorCommands.insertEmptyParagraph(editor, { at: nextPath });
                editor.select(nextPath);
                return true;
            }
        }

        if (isHotkey('shift+enter', event.nativeEvent) && !event.isDefaultPrevented()) {
            event.preventDefault();
            editor.insertText('\n');
            return true;
        }

        if (isDeletingEvent(event)) {
            const nodeEntry = EditorCommands.getCurrentNodeEntry(editor);
            const now = Date.now();
            const isHoldingDelete = now - lastBackspaceTimestamp <= HOLDING_BACKSPACE_THRESHOLD;
            lastBackspaceTimestamp = now;

            if (!nodeEntry || !isImageNode(nodeEntry[0])) {
                return;
            }

            if (EditorCommands.isNodeEmpty(editor, nodeEntry[0])) {
                if (!isHoldingDelete) {
                    replaceImageWithParagraph(editor, nodeEntry[1]);
                }

                event.preventDefault();
                event.stopPropagation();
                return true;
            }

            if (
                isDeletingEventBackward(event) &&
                EditorCommands.isSelectionAtBlockStart(editor) &&
                EditorCommands.isSelectionEmpty(editor)
            ) {
                replaceImageWithParagraph(editor, nodeEntry[1]);
                event.preventDefault();
                event.stopPropagation();
                return true;
            }
        }

        return false;
    },
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isImageNode(element)) {
            return (
                <ImageElement
                    attributes={attributes}
                    element={element}
                    onCrop={onCrop}
                    onCropped={onCropped}
                    onRemoved={onRemoved}
                    onReplace={onReplace}
                    onReplaced={onReplaced}
                    withAlignmentOptions={withAlignmentOptions}
                    withCaptions={withCaptions}
                    withLayoutOptions={withLayoutOptions}
                    withNewTabOption={withNewTabOption}
                    withMediaGalleryTab={withMediaGalleryTab}
                    withSizeOptions={withSizeOptions}
                >
                    {children}
                </ImageElement>
            );
        }

        return undefined;
    },
    withOverrides: withImages,
});

function replaceImageWithParagraph(editor: SlateEditor, at: Path) {
    EditorCommands.replaceNode(editor, createParagraph(), { at, match: isImageNode });
}
