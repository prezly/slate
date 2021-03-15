/* It may not be possible to access the actual reference to an underlying DOM element.
 * This may happen when using a component from an external library (e.g. Button from react-bootstrap).
 * findDOMNode from 'react-dom' is now being deprecated, hence the following check.
 */
const isHtmlElement = (candidate: HTMLElement | null): candidate is HTMLElement =>
    Boolean(candidate && candidate instanceof HTMLElement);

export default isHtmlElement;
