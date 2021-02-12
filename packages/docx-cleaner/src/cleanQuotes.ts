/* eslint-disable no-param-reassign */

import changeTagName from './changeTagName';
import traverseElements from './traverseElements';

const cleanQuotes = (rootNode: Node): void => {
    traverseElements(rootNode, (element) => {
        if (
            element.parentNode &&
            element.tagName === 'P' &&
            element.classList.contains('MsoQuote')
        ) {
            changeTagName(element, 'blockquote');
        }

        return true;
    });
};

export default cleanQuotes;
