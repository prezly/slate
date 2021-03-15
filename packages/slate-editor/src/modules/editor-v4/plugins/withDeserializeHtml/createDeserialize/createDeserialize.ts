import { Extension, isGoogleDocsWrapper } from '@prezly/slate-commons';
import { jsx } from '@prezly/slate-hyperscript';
import { Descendant, Element } from 'slate';

import deserializeHtmlToElement from './deserializeHtmlToElement';
import deserializeHtmlToMarks from './deserializeHtmlToMarks';
import deserializeText from './deserializeText';

type DeserializeHTMLChildren = ChildNode | Descendant | string | null;

const deserializeNode = (extensions: Extension[], onError: (error: Error) => void) => {
    return (node: HTMLElement | ChildNode): string | Element | DeserializeHTMLChildren[] | null => {
        const children = Array.from(node.childNodes).flatMap(deserializeNode(extensions, onError));

        if (node.nodeType === Node.TEXT_NODE && node.parentNode?.nodeName !== 'BODY') {
            return deserializeText(extensions)(node as Text);
        }

        if (node.nodeType !== Node.ELEMENT_NODE) {
            return null;
        }

        const htmlElement = node as HTMLElement;
        if (htmlElement.nodeName === 'BODY' || isGoogleDocsWrapper(htmlElement)) {
            return jsx('fragment', {}, children);
        }

        const element = deserializeHtmlToElement(extensions, onError)(htmlElement, children);
        if (element) {
            return element;
        }

        const marks = deserializeHtmlToMarks(extensions)(htmlElement, children);
        if (marks) {
            return marks;
        }

        return children;
    };
};

const createDeserialize = (extensions: Extension[], onError: (error: Error) => void) => {
    return (node: HTMLElement): Descendant[] => {
        return deserializeNode(extensions, onError)(node) as Descendant[];
    };
};

export default createDeserialize;
