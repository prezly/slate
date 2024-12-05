import { EditorCommands } from '@prezly/slate-commons';
import { isImageNode } from '@prezly/slate-types';
import { isExpanded, type SlateEditor } from '@udecode/plate-common';
import jsonStableStringify from 'json-stable-stringify';
import { useLayoutEffect } from 'react';

import { ensureElementInView, ensureRangeInView } from '#lib';

export interface Parameters {
    minTop?: number;
    minBottom?: number;
}

export function useCursorInView(editor: SlateEditor, parameters: false | Parameters = false): void {
    useLayoutEffect(() => {
        if (!parameters) return;

        try {
            ensureCursorInView(editor, parameters);
        } catch {
            // Ignore all cursor-related errors. They sometimes come from Slate.
        }
    }, [editor, editor.selection, jsonStableStringify(parameters)]);
}

function ensureCursorInView(editor: SlateEditor, parameters: Parameters): void {
    if (!editor.selection) {
        return;
    }
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (isExpanded(editor.selection) || isImageNode(currentNode)) {
        // Slate has built-in mechanism to follow the cursor, but it's not perfect,
        // see: https://github.com/ianstormtaylor/slate/issues/3750
        // We don't know any issues when selecting things, so our fix is only
        // about following the cursor (when `Range.isCollapsed(editor.selection)`).
        // When `Range.isExpanded(editor.selection)` we leave the work to Slate.
        return;
    }

    if (
        currentNode &&
        EditorCommands.isBlock(editor, currentNode) &&
        EditorCommands.isVoid(editor, currentNode)
    ) {
        /**
         * Slate reports invalid `domRange` on void elements. The reported range points to
         * the `data-slate-zero-width` element which is inside [data-slate-spacer="true"]
         * element after a void block.
         * Looking at how browser renders the element, it appears as if it exists in the
         * paragraph after the void element. Therefore, positioning calculation is incorrect,
         * which causes the an edge case where scrolling does not work correctly:
         * https://github.com/prezly/prezly/pull/8434#discussion_r485427970
         * This seems to be a problem in Chrome/Chromium, but not in Firefox.
         *
         * As a fallback, we use the DOM element of the currentNode and ensure this
         * element is in view.
         */
        const domElement = EditorCommands.toDomNode(editor, currentNode);
        ensureElementInView(domElement, {
            minBottom: parameters.minBottom,
            minTop: parameters.minTop,
        });
        return;
    }

    const domRange = EditorCommands.toDomRange(editor, editor.selection);
    ensureRangeInView(domRange, {
        minBottom: parameters.minBottom,
        minTop: parameters.minTop,
        skipWhenDoesNotFitView: true,
    });
}
