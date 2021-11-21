import RangeFix from 'rangefix';

import getScrollParent from './getScrollParent';
import type { Options } from './scrollIntoView';
import scrollIntoView from './scrollIntoView';

const ensureRangeInView = (range: Range | null, options: Options): void => {
    if (!range) {
        return;
    }

    // Polyfill for collapsed selection, because Safari returns invalid coordinates.
    const rangeRect = RangeFix.getBoundingClientRect(range);
    const rangeContainer =
        range.commonAncestorContainer instanceof HTMLElement
            ? range.commonAncestorContainer
            : range.commonAncestorContainer.parentElement;

    if (!rangeRect || !rangeContainer) {
        return;
    }

    const parent = getScrollParent(rangeContainer);
    scrollIntoView(parent, rangeRect, options);
};

export default ensureRangeInView;
