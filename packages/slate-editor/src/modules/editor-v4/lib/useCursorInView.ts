import { EditorCommands } from '@prezly/slate-commons';
import jsonStableStringify from 'json-stable-stringify';
import { useLayoutEffect, useMemo } from 'react';
import { Editor, Range } from 'slate';

import { ensureElementInView, ensureRangeInView } from '../../../lib';
import type { EditorV4Props } from '../types';

function useMemoizedWithCursorInView(
    withCursorInView: EditorV4Props['withCursorInView'],
): EditorV4Props['withCursorInView'] {
    // I know what I'm doing:
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(() => withCursorInView, [jsonStableStringify(withCursorInView)]);
}

function ensureCursorInView(
    editor: Editor,
    withCursorInView: EditorV4Props['withCursorInView'],
): void {
    if (!withCursorInView || !editor.selection) {
        return;
    }

    if (Range.isExpanded(editor.selection)) {
        // Slate has built-in mechanism to follow the cursor, but it's not perfect,
        // see: https://github.com/ianstormtaylor/slate/issues/3750
        // We don't know any issues when selecting things, so our fix is only
        // about following the cursor (when `Range.isCollapsed(editor.selection)`).
        // When `Range.isExpanded(editor.selection)` we leave the work to Slate.
        return;
    }

    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

    if (Editor.isBlock(editor, currentNode) && Editor.isVoid(editor, currentNode)) {
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
            minBottom: withCursorInView.minBottom,
            minTop: withCursorInView.minTop,
        });
        return;
    }

    const domRange = EditorCommands.toDomRange(editor, editor.selection);

    ensureRangeInView(domRange, {
        minBottom: withCursorInView.minBottom,
        minTop: withCursorInView.minTop,
        skipWhenDoesNotFitView: true,
    });
}

export function useCursorInView(
    editor: Editor,
    withCursorInView: EditorV4Props['withCursorInView'],
): void {
    // We have to memoize it - otherwise the useLayoutEffect would kick in too often (e.g. on re-render)
    const memoizedWithCursorInView = useMemoizedWithCursorInView(withCursorInView);

    useLayoutEffect(() => {
        try {
            ensureCursorInView(editor, memoizedWithCursorInView);
        } catch (error) {
            // Ignore all cursor-related errors. They sometimes come from Slate.
        }
    }, [editor, editor.selection, memoizedWithCursorInView]);
}

