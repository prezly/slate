import { EditorCommands } from '@prezly/slate-commons';
import { isImageNode } from '@prezly/slate-types';
import type { Rect } from 'rangefix';
import RangeFix from 'rangefix';
import { Editor, Range } from 'slate';

import { getScrollParent } from './getScrollParent';
import { scrollTo } from './scrollTo';

interface Options {
    minTop?: number;
    minBottom?: number;
    padding?: number;
}

type DOMRange = globalThis.Range;
type ScrollSelectionIntoViewFn = (editor: Editor, domRange: DOMRange) => void;

export function createScrollSelectionIntoViewCallback(
    options: Options = {},
): ScrollSelectionIntoViewFn {
    return function (editor, domRange) {
        // Comment from the original `slate` repo:
        // > This was affecting the selection of multiple blocks and dragging behavior,
        // > so enabled only if the selection has been collapsed.
        if (editor.selection && Range.isExpanded(editor.selection)) {
            return;
        }

        const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];

        if (
            (Editor.isBlock(editor, currentNode) && Editor.isVoid(editor, currentNode)) ||
            isImageNode(currentNode)
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
            if (!domElement) return;

            const scrollParent = getScrollParent(domElement);
            if (!scrollParent) return;

            const rect = domElement.getBoundingClientRect();

            scrollIntoView(scrollParent, rect, options);
            return;
        }

        if (!(domRange.startContainer.parentElement instanceof Element)) return;

        const scrollParent = getScrollParent(domRange.startContainer.parentElement);
        if (!scrollParent) return;

        const rect = RangeFix.getBoundingClientRect(domRange);
        if (!rect) return;

        scrollIntoView(scrollParent, rect, options);
    };
}

/**
 * This one is slightly different than `Element.prototype.scrollIntoView`.
 *
 * The built-in function does not take sticky or fixed positioned elements around the page
 * into account. You may call `element.scrollIntoView()` and then the element will still
 * be covered by something with greater z-index, so the `element` is not really in view.
 * This function right here additionally supports `minTop` and `minBottom` parameters
 * which can be used when you know up front how much room is taken at the top or bottom
 * of the scrolling parent (e.g. some sticky/fixed header or sticky/fixed footer).
 *
 * One other difference is that this function only works in Y axis, while
 * `Element.prototype.scrollIntoView` works in X axis as well. Support for that can
 * be added too though, in case we need it in the future.
 */
function scrollIntoView(
    parent: HTMLElement,
    rect: ClientRect | Rect,
    { minTop = 0, minBottom = 0, padding = 16 }: Options = {},
) {
    const { height: parentHeight } = parent.getBoundingClientRect();
    const { height: elementHeight, top: elementTop } = rect;
    const isChildAboveVisibleArea = elementTop < minTop;
    const isChildBelowVisibleArea = elementTop + elementHeight > parentHeight - minBottom;

    if (isChildAboveVisibleArea && isChildBelowVisibleArea) {
        // Child spans through all visible area which means it's already in view.
        return;
    }

    if (isChildAboveVisibleArea) {
        const y = parent.scrollTop + elementTop - minTop - padding;
        scrollTo(parent, parent.scrollLeft, y);
        return;
    }

    if (isChildBelowVisibleArea) {
        // Scroll to align the BOTTOM EDGE of the element with the viewport,
        // but disallow the element TOP EDGE to leave the viewport.
        // This is critical for tall elements, like big galleries.
        const y = Math.min(
            parent.scrollTop + elementTop - minTop - padding,
            parent.scrollTop + elementTop + elementHeight - parentHeight + minBottom + padding,
        );
        scrollTo(parent, parent.scrollLeft, y);
    }
}
