/* eslint-disable no-param-reassign */

import { NO_BREAK_SPACE } from '../constants';

import traverseElements from './traverseElements';

const isEmptyOp = (element: Element): boolean =>
    element.nodeName === 'O:P' && element.textContent === NO_BREAK_SPACE;

const isEmpty = (element: Element): boolean =>
    element.children.length === 1 &&
    element.firstElementChild !== null &&
    (isEmptyOp(element.firstElementChild) || isEmpty(element.firstElementChild));

const cleanEmptyParagraphs = (rootNode: Node): void => {
    traverseElements(rootNode, (element) => {
        if (element.tagName === 'P' && isEmpty(element)) {
            element.innerHTML = '';
        }

        return true;
    });
};

export default cleanEmptyParagraphs;
