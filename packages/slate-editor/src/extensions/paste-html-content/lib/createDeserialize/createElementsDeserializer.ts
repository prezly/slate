import type { DeserializeElement } from '@prezly/slate-commons';
import type { Descendant, Element } from 'slate';

import type { HTMLElement } from './dom';

export type ElementsDeserializer = (node: HTMLElement, children: Descendant[]) => Element | null;

export function createElementsDeserializer(
    deserialize: DeserializeElement,
    onError: (error: unknown) => void,
): ElementsDeserializer {
    return function (node, children) {
        let attributes = undefined;

        try {
            attributes = deserialize(node);
        } catch (error) {
            onError(error);
        }

        if (typeof attributes === 'undefined') {
            // The deserializer did not manage to deserialize this `node`.
            // Apparently, the `node` did not match constraints enforced by
            // particular deserializer.
            // Just because a deserializer for a particular `type` (e.g. "DIV")
            // exists, it does not mean we want to deserialize it.
            // All Elements in Prezly have at least 1 attribute - `type`, so
            // if `attributes` are `undefined`, surely we want to skip this `node`.
            return null;
        }

        return {
            ...attributes,
            children: withAtLeastOneTextNode(children),
        } as Element;
    };
}

function withAtLeastOneTextNode(children: Descendant[]): Descendant[] {
    if (children.length === 0) {
        return [{ text: '' }];
    }
    return children;
}
