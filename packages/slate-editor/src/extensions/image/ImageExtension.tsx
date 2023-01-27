import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement, EditorCommands, withoutNodes } from '@prezly/slate-commons';
import type { ImageNode } from '@prezly/slate-types';
import { IMAGE_NODE_TYPE, isImageNode } from '@prezly/slate-types';
import { isHotkey } from 'is-hotkey';
import { isEqual, noop } from 'lodash-es';
import type { KeyboardEvent } from 'react';
import React from 'react';
import type { NodeEntry, Node, Editor } from 'slate';
import { Path, Transforms } from 'slate';
import type { RenderElementProps } from 'slate-react';

import { isDeletingEvent, isDeletingEventBackward } from '#lib';

import { createParagraph } from '#extensions/paragraphs';
import { composeElementDeserializer } from '#modules/html-deserialization';

import { ImageElement } from './components';
import {
    createImageCandidate,
    getAncestorAnchor,
    isImageCandidateElement,
    normalizeImageCandidate,
    normalizeRedundantImageAttributes,
    parseSerializedElement,
} from './lib';
import type { ImageCandidateNode, ImageExtensionConfiguration } from './types';
import { withImages } from './withImages';

const HOLDING_BACKSPACE_THRESHOLD = 100;

let lastBackspaceTimestamp = 0;

interface Parameters extends ImageExtensionConfiguration {
    onCrop?: (editor: Editor, element: ImageNode) => void;
    onRemove?: (editor: Editor, element: ImageNode) => void;
    onReplace?: (editor: Editor, element: ImageNode) => void;
}

export const EXTENSION_ID = 'ImageExtension';

export const ImageExtension = ({
    captions,
    onCrop = noop,
    onRemove = noop,
    onReplace = noop,
    withAlignmentOptions = false,
    withSizeOptions = false,
    withLayoutOptions = false,
    withNewTabOption = true,
}: Parameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [IMAGE_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            IMG: (element: HTMLElement): ImageCandidateNode | undefined => {
                const imageElement = element as HTMLImageElement;
                const anchorElement = getAncestorAnchor(imageElement);

                if (anchorElement && !anchorElement.textContent) {
                    return createImageCandidate(imageElement.src, anchorElement.href);
                }

                return createImageCandidate(imageElement.src);
            },
        }),
    },
    isElementEqual: (node, another) => {
        if (isImageNode(node) && isImageNode(another)) {
            return (
                node.href === another.href &&
                node.layout === another.layout &&
                node.align === another.align &&
                node.new_tab === another.new_tab &&
                node.width === another.width &&
                isEqual(node.file, another.file)
            );
        }
        return undefined;
    },
    isRichBlock: isImageNode,
    isVoid: (node) => {
        if (captions) {
            return isImageCandidateElement(node);
        }
        return isImageCandidateElement(node) || isImageNode(node);
    },
    normalizeNode: [
        normalizeRedundantImageAttributes,
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
                    replaceImageWithParagraph(editor, nodeEntry);
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
                replaceImageWithParagraph(editor, nodeEntry);
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
    serialize: (nodes) => withoutNodes(nodes, isImageCandidateElement),
    withOverrides: withImages,
});

function replaceImageWithParagraph(editor: Editor, entry: NodeEntry<Node>) {
    EditorCommands.replaceNode(
        editor,
        {
            entry,
            match: isImageNode,
        },
        createParagraph(),
    );
}
