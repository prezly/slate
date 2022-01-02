// Based on jQuery's UI scrollParent()
// https://github.com/jquery/jquery-ui/blob/9dd2576494166e0324ef3c9714a43ecfd8db90d1/ui/scroll-parent.js

/**
 * It assumes none of the ancestors have `transform`, `perspective`, or `filter` properties.
 * See: https://github.com/prezly/prezly/pull/8416#discussion_r484528404
 */
export function getScrollParent(element: HTMLElement): HTMLElement {
    const elementStyle = window.getComputedStyle(element);
    const excludeStaticParent = elementStyle.position === 'absolute';

    if (elementStyle.position === 'fixed') {
        return document.body;
    }

    let parent: HTMLElement | null = element;

    while (parent) {
        const parentStyle = window.getComputedStyle(parent);

        if (parentStyle.position !== 'static' || !excludeStaticParent) {
            const overflowAttributes = [
                parentStyle.overflow,
                parentStyle.overflowY,
                parentStyle.overflowX,
            ];

            if (overflowAttributes.includes('auto') || overflowAttributes.includes('hidden')) {
                return parent;
            }
        }

        parent = parent.parentElement;
    }

    return document.documentElement;
}
