import type { Extension } from '@prezly/slate-commons';
import { isGoogleDocsWrapper } from '@prezly/slate-commons';
import type { Descendant, Element } from 'slate';
import { jsx } from 'slate-hyperscript';

import { createElementsDeserializer } from './createElementsDeserializer';
import { createMarksDeserializer } from './createMarksDeserializer';
import { createTextDeserializer } from './createTextDeserializer';
import { getElementDeserializers } from './getElementDeserializers';
import { getLeafDeserializers } from './getLeafDeserializers';

type DeserializeHTMLChildren = ChildNode | Descendant | string | null;

export function createDeserializer(extensions: Extension[], onError: (error: unknown) => void) {
    const deserializeElement = createElementsDeserializer(
        getElementDeserializers(extensions),
        onError,
    );
    const deserializeMarks = createMarksDeserializer(getLeafDeserializers(extensions));
    const deserializeText = createTextDeserializer(deserializeMarks);

    function deserialize(
        node: HTMLElement | ChildNode,
    ): string | Element | DeserializeHTMLChildren[] | null {
        const children = Array.from(node.childNodes).flatMap(deserialize);

        if (node.nodeType === Node.TEXT_NODE && node.parentNode?.nodeName !== 'BODY') {
            return deserializeText(node as Text);
        }

        if (node.nodeType !== Node.ELEMENT_NODE) {
            return null;
        }

        const htmlElement = node as HTMLElement;
        if (htmlElement.nodeName === 'BODY' || isGoogleDocsWrapper(htmlElement)) {
            return jsx('fragment', {}, children);
        }

        const element = deserializeElement(htmlElement, children);
        if (element) {
            return element;
        }

        const marks = deserializeMarks(htmlElement, children);
        if (marks) {
            return marks;
        }

        return children;
    }

    return (node: HTMLElement) => deserialize(node) as Descendant[];
}
