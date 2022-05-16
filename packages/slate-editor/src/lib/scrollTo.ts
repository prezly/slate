/* eslint-disable no-param-reassign */

/**
 * A polyfill for `HTMLElement.prototype.scrollTo`, which does not work in old browsers:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo#Browser_Compatibility
 */
export function scrollTo(element: HTMLElement, left: number, top: number) {
    if ('scroll' in element) {
        element.scroll({ left, top })
    } else {
        element.scrollLeft = left;
        element.scrollTop = top;
    }
}
