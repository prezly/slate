import scrollTo from './scrollTo';

export interface Options {
    minBottom: number;
    minTop: number;
    skipWhenDoesNotFitView?: boolean;
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
const scrollIntoView = (
    parent: HTMLElement,
    rect: ClientRect,
    { minBottom, minTop, skipWhenDoesNotFitView = false }: Options,
) => {
    const { height: parentHeight } = parent.getBoundingClientRect();
    const { height: elementHeight, top: elementTop } = rect;
    const isChildAboveVisibleArea = elementTop < minTop;
    const isChildBelowVisibleArea = elementTop + elementHeight > parentHeight - minBottom;
    const willFitInView = parentHeight >= elementHeight;

    if (isChildAboveVisibleArea && isChildBelowVisibleArea) {
        // Child spans through all visible area which means it's already in view.
        return;
    }

    if (skipWhenDoesNotFitView && !willFitInView) {
        // If it won't fit in view, don't do anything as it would cause a huge content jump
        // that's difficult to follow for the user.
        return;
    }

    if (isChildAboveVisibleArea) {
        const y = parent.scrollTop + elementTop - minTop;
        scrollTo(parent, parent.scrollLeft, y);
    } else if (isChildBelowVisibleArea) {
        const y = parent.scrollTop + elementTop + elementHeight - parentHeight + minBottom;
        scrollTo(parent, parent.scrollLeft, y);
    }
};

export default scrollIntoView;
