import type { Extension } from '@prezly/slate-commons';
import { isGoogleDocsWrapper } from '@prezly/slate-commons';
import { jsx } from '@prezly/slate-hyperscript';
import type { Descendant, Element } from 'slate';

import { deserializeHtmlToElement } from './deserializeHtmlToElement';
import { deserializeHtmlToMarks } from './deserializeHtmlToMarks';
import { deserializeText } from './deserializeText';

type DeserializeHTMLChildren = ChildNode | Descendant | string | null;

function deserializeNode(extensions: Extension[], onError: (error: unknown) => void) {
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
}

export function createDeserialize(extensions: Extension[], onError: (error: unknown) => void) {
    return (node: HTMLElement): Descendant[] => {
        return deserializeNode(extensions, onError)(node) as Descendant[];
    };
}
