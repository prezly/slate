import getScrollParent from './getScrollParent';
import type { Options } from './scrollIntoView';
import scrollIntoView from './scrollIntoView';

function ensureElementInView(element: HTMLElement | null, options: Options): void {
    if (!element) {
        return;
    }

    const parent = getScrollParent(element);
    const elementRect = element.getBoundingClientRect();
    scrollIntoView(parent, elementRect, options);
}

export default ensureElementInView;
