import { createDeserializeElement, EditorCommands, Extension } from '@prezly/slate-commons';
import isHotkey from 'is-hotkey';
import { noop } from 'lodash';
import React, { KeyboardEvent } from 'react';
import { Path, Transforms } from 'slate';
import { ReactEditor, RenderElementProps } from 'slate-react';

import { ImageElement } from './components';
import { IMAGE_CANDIDATE_TYPE, IMAGE_EXTENSION_ID, IMAGE_TYPE } from './constants';
import {
    createImageCandidate,
    getAncestorAnchor,
    isDeleting,
    isDeletingBackward,
    isImageElement,
    normalizeChildren,
    normalizeImageCandidate,
    normalizeRedundantImageAttributes,
    parseSerializedElement,
} from './lib';
import { ImageCandidateElementType, ImageParameters } from './types';

const HOLDING_BACKSPACE_THRESHOLD = 100;

let lastBackspaceTimestamp = 0;

const ImageExtension = ({
    availableWidth,
    captions,
    containerRef,
    onEdit = noop,
    onRemove = noop,
    showLayoutControls,
}: ImageParameters): Extension => ({
    deserialize: {
        element: {
            [IMAGE_TYPE]: createDeserializeElement(parseSerializedElement),
            IMG: (element: HTMLElement): ImageCandidateElementType | undefined => {
                const imageElement = element as HTMLImageElement;
                const anchorElement = getAncestorAnchor(imageElement);

                if (anchorElement && !anchorElement.textContent) {
                    return createImageCandidate(imageElement.src, anchorElement.href);
                }

                return createImageCandidate(imageElement.src);
            },
        },
    },
    id: IMAGE_EXTENSION_ID,
    normalizers: [
        normalizeRedundantImageAttributes,
        normalizeChildren,
        // normalizeImageCandidate needs to be last because it removes the image candidate element
        normalizeImageCandidate,
    ],
    onKeyDown: (event: KeyboardEvent, editor: ReactEditor) => {
        if (!captions) {
            return;
        }

        if (isHotkey('enter', event.nativeEvent)) {
            const nodeEntry = EditorCommands.getCurrentNodeEntry(editor);
            if (nodeEntry && isImageElement(nodeEntry[0])) {
                event.preventDefault();

                const nextPath = Path.next(nodeEntry[1]);
                EditorCommands.insertEmptyParagraph(editor, nextPath);
                Transforms.select(editor, nextPath);
            }
        }

        if (isHotkey('shift+enter', event.nativeEvent) && !event.isDefaultPrevented()) {
            event.preventDefault();
            Transforms.insertText(editor, '\n');
        }

        if (isDeleting(event)) {
            const nodeEntry = EditorCommands.getCurrentNodeEntry(editor);
            const now = Date.now();
            const isHoldingDelete = now - lastBackspaceTimestamp <= HOLDING_BACKSPACE_THRESHOLD;
            lastBackspaceTimestamp = now;

            if (!nodeEntry || !isImageElement(nodeEntry[0])) {
                return;
            }

            if (EditorCommands.isNodeEmpty(editor, nodeEntry[0])) {
                if (!isHoldingDelete) {
                    EditorCommands.removeNode(editor, {
                        at: nodeEntry[1],
                        match: isImageElement,
                    });
                }

                event.preventDefault();
                event.stopPropagation();
                return;
            }

            if (isDeletingBackward(event) && EditorCommands.isSelectionAtBlockStart(editor)) {
                EditorCommands.removeNode(editor, {
                    at: nodeEntry[1],
                    match: isImageElement,
                });
                event.preventDefault();
                event.stopPropagation();
            }
        }
    },
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isImageElement(element)) {
            return (
                <ImageElement
                    attributes={attributes}
                    availableWidth={availableWidth}
                    containerRef={containerRef}
                    element={element}
                    onEdit={onEdit}
                    onRemove={onRemove}
                    showLayoutControls={showLayoutControls}
                >
                    {children}
                </ImageElement>
            );
        }

        return undefined;
    },
    rootTypes: [IMAGE_CANDIDATE_TYPE, IMAGE_TYPE],
    voidTypes: captions ? [IMAGE_CANDIDATE_TYPE] : [IMAGE_CANDIDATE_TYPE, IMAGE_TYPE],
});

export default ImageExtension;
