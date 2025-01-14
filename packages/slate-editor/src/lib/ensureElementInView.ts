import { getScrollParent } from './getScrollParent';
import type { Options } from './scrollIntoView';
import { scrollIntoView } from './scrollIntoView';

export function ensureElementInView(element: HTMLElement | undefined, options: Options): void {
    if (!element) {
        return;
    }

    const parent = getScrollParent(element);
    const elementRect = element.getBoundingClientRect();
    scrollIntoView(parent, elementRect, options);
}
