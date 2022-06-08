import type { DeserializeElement } from '@prezly/slate-commons';
import type { Descendant, Element } from 'slate';
import { jsx } from 'slate-hyperscript';

type DeserializeHTMLChildren = ChildNode | Descendant | string | null;

export type ElementsDeserializer = (
    node: HTMLElement,
    children: DeserializeHTMLChildren[],
) => Element | null;

interface Attributes extends Record<string, any> {
    type: string;
}

export function createElementsDeserializer(
    deserializers: DeserializeElement,
    onError: (error: unknown) => void,
): ElementsDeserializer {
    return function (node, children) {
        const type = node.getAttribute('data-slate-type') || node.nodeName;

        if (deserializers[type]) {
            let attributes: Attributes | undefined;

            try {
                attributes = deserializers[type](node);
            } catch (error) {
                onError(error);
            }

            if (typeof attributes === 'undefined') {
                // The deserializer did not manage to deserialize this `node`.
                // Appearently the `node` did not match constraints enforced by
                // particular deserializer.
                // Just because a deserializer for a particular `type` (e.g. "DIV")
                // exists, it does not mean we want to deserialize it.
                // All Elements in Prezly have at least 1 attribute - `type`, so
                // if `attributes` are `undefined`, surely we want to skip this `node`.
                return null;
            }

            let descendants = children as (Descendant | null)[];
            const validDescendants = descendants.filter((descendant) => descendant !== null);

            if (validDescendants.length === 0) {
                descendants = [{ text: '' }];
            }

            return jsx('element', attributes, descendants);
        }

        return null;
    };
}
