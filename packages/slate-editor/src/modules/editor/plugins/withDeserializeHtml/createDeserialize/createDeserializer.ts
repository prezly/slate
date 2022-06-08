import type { Extension } from '@prezly/slate-commons';
import type { Descendant } from 'slate';

import { isGoogleDocsWrapper } from '#lib';

import {
    combineExtensionsElementDeserializers,
    combineExtensionsMarkDeserializers,
} from '#modules/html-deserialization';

import { createElementsDeserializer } from './createElementsDeserializer';
import { createMarksDeserializer } from './createMarksDeserializer';
import { createTextDeserializer } from './createTextDeserializer';
import type { HTMLNode } from './dom';
import { isHTMLElement, isHTMLText } from './dom';

export function createDeserializer(extensions: Extension[], onError: (error: unknown) => void) {
    const deserializeElement = createElementsDeserializer(
        combineExtensionsElementDeserializers(extensions),
        onError,
    );
    const deserializeMarks = createMarksDeserializer(
        combineExtensionsMarkDeserializers(extensions),
    );
    const deserializeText = createTextDeserializer();

    return function deserialize(node: HTMLNode): Descendant[] {
        if (isHTMLText(node) && node.parentNode?.nodeName !== 'BODY') {
            return deserializeText(node);
        }

        if (isHTMLElement(node)) {
            const children = Array.from(node.childNodes).flatMap(deserialize);

            if (node.nodeName === 'BODY' || isGoogleDocsWrapper(node)) {
                return children;
            }

            const element = deserializeElement(node, children);
            if (element) {
                return [element];
            }

            return deserializeMarks(node, children);
        }

        return [];
    };
}
