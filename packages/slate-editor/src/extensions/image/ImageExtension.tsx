import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement, EditorCommands } from '@prezly/slate-commons';
import type { ImageNode, ParagraphNode } from '@prezly/slate-types';
import { IMAGE_NODE_TYPE, isImageNode } from '@prezly/slate-types';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import React from 'react';
import type { Editor } from 'slate';
import { Path, Transforms } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { isDeletingEvent, isDeletingEventBackward } from '#lib';
import { noop } from '#lodash';

import { createParagraph } from '#extensions/paragraphs';

import { ImageElement } from './components';
import { IMAGE_CANDIDATE_TYPE, IMAGE_EXTENSION_ID } from './constants';
import {
    createImageCandidate,
    getAncestorAnchor,
    normalizeChildren,
    normalizeImageCandidate,
    normalizeRedundantImageAttributes,
    parseSerializedElement,
} from './lib';
import type { ImageCandidateNode, ImageParameters } from './types';

const HOLDING_BACKSPACE_THRESHOLD = 100;

let lastBackspaceTimestamp = 0;

export const ImageExtension = ({
    captions,
    onCrop = noop,
    onRemove = noop,
    onReplace = noop,
    withAlignmentOptions = false,
    withSizeOptions = false,
    withLayoutOptions = false,
    withNewTabOption = true,
}: ImageParameters): Extension => ({
    id: IMAGE_EXTENSION_ID,
    deserialize: {
        element: {
            [IMAGE_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            IMG: (element: HTMLElement): ImageCandidateNode | undefined => {
                const imageElement = element as HTMLImageElement;
                const anchorElement = getAncestorAnchor(imageElement);

                if (anchorElement && !anchorElement.textContent) {
                    return createImageCandidate(imageElement.src, anchorElement.href);
                }

                return createImageCandidate(imageElement.src);
            },
        },
    },
    normalizers: [
        normalizeRedundantImageAttributes,
        normalizeChildren,
        // normalizeImageCandidate needs to be last because it removes the image candidate element
        normalizeImageCandidate,
    ],
    onKeyDown: (event: KeyboardEvent, editor: Editor) => {
        if (!captions) {
            return;
        }

        if (isHotkey('enter', event.nativeEvent)) {
            const nodeEntry = EditorCommands.getCurrentNodeEntry(editor);
            if (nodeEntry && isImageNode(nodeEntry[0])) {
                event.preventDefault();

                const nextPath = Path.next(nodeEntry[1]);
                EditorCommands.insertEmptyParagraph(editor, { at: nextPath });
                Transforms.select(editor, nextPath);
            }
        }

        if (isHotkey('shift+enter', event.nativeEvent) && !event.isDefaultPrevented()) {
            event.preventDefault();
            Transforms.insertText(editor, '\n');
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
                    Transforms.setNodes<ImageNode | ParagraphNode>(editor, createParagraph(), {
                        at: nodeEntry[1],
                        match: isImageNode,
                    });
                }

                event.preventDefault();
                event.stopPropagation();
                return;
            }

            if (
                isDeletingEventBackward(event) &&
                EditorCommands.isSelectionAtBlockStart(editor) &&
                EditorCommands.isSelectionEmpty(editor)
            ) {
                Transforms.setNodes<ImageNode | ParagraphNode>(editor, createParagraph(), {
                    at: nodeEntry[1],
                    match: isImageNode,
                });
                event.preventDefault();
                event.stopPropagation();
            }
        }
    },
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isImageNode(element)) {
            return (
                <ImageElement
                    attributes={attributes}
                    element={element}
                    onCrop={onCrop}
                    onRemove={onRemove}
                    onReplace={onReplace}
                    withAlignmentOptions={withAlignmentOptions}
                    withSizeOptions={withSizeOptions}
                    withLayoutOptions={withLayoutOptions}
                    withNewTabOption={withNewTabOption}
                >
                    {children}
                </ImageElement>
            );
        }

        return undefined;
    },
    rootTypes: [IMAGE_CANDIDATE_TYPE, IMAGE_NODE_TYPE],
    voidTypes: captions ? [IMAGE_CANDIDATE_TYPE] : [IMAGE_CANDIDATE_TYPE, IMAGE_NODE_TYPE],
});
