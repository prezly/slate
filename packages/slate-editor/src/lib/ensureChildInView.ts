import { isHtmlElement } from './isHtmlElement';
import { scrollTo } from './scrollTo';

const DEFAULT_SAFETY_MARGIN = 50;

function ensureInView(parent: HTMLElement, child: HTMLElement | null, safetyMargin: number) {
    if (!isHtmlElement(parent) || !isHtmlElement(child) || !parent.contains(child)) {
        return;
    }

    const { height: childHeight } = child.getBoundingClientRect();
    const { height: parentHeight } = parent.getBoundingClientRect();
    const isChildAboveVisibleArea = child.offsetTop < parent.scrollTop;
    const isChildBelowVisibleArea = child.offsetTop + childHeight > parent.scrollTop + parentHeight;

    if (isChildAboveVisibleArea) {
        const y = child.offsetTop - safetyMargin;
        scrollTo(parent, parent.scrollLeft, y);
    } else if (isChildBelowVisibleArea) {
        const y = child.offsetTop + childHeight + safetyMargin - parentHeight;
        scrollTo(parent, parent.scrollLeft, y);
    }
}

function ensureInViewByIndex(parent: HTMLElement, childIndex: number, safetyMargin: number) {
    const child = parent.children[childIndex] as HTMLElement;
    ensureInView(parent, child, safetyMargin);
}

export function ensureChildInView(
    parent: HTMLElement | null,
    child: HTMLElement | null | number,
    safetyMargin: number = DEFAULT_SAFETY_MARGIN,
) {
    if (parent === null) {
        return;
    }

    if (typeof child === 'number') {
        ensureInViewByIndex(parent, child, safetyMargin);
    } else {
        ensureInView(parent, child, safetyMargin);
    }
}
