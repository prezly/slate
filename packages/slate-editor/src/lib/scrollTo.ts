/* eslint-disable no-param-reassign */

/**
 * A polyfill for `HTMLElement.prototype.scrollTo`, which does not work in old browsers:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo#Browser_Compatibility
 */
export default function scrollTo(element: HTMLElement, x: number, y: number) {
    element.scrollLeft = x;
    element.scrollTop = y;
}
