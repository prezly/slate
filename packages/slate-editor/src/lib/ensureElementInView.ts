import getScrollParent from './getScrollParent';
import scrollIntoView, { Options } from './scrollIntoView';

const ensureElementInView = (element: HTMLElement | null, options: Options): void => {
    if (!element) {
        return;
    }

    const parent = getScrollParent(element);
    const elementRect = element.getBoundingClientRect();
    scrollIntoView(parent, elementRect, options);
};

export default ensureElementInView;
