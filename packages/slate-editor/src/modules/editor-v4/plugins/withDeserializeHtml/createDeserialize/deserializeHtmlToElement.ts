import { Extension } from '@prezly/slate-commons';
import { jsx } from '@prezly/slate-hyperscript';
import { Descendant, Element } from 'slate';

import getElementDeserializers from './getElementDeserializers';

type DeserializeHTMLChildren = ChildNode | Descendant | string | null;

interface Attributes extends Record<string, any> {
    type: string;
}

const deserializeHtmlToElement = (extensions: Extension[], onError: (error: Error) => void) => (
    node: HTMLElement,
    children: DeserializeHTMLChildren[],
): Element | null => {
    const type = node.getAttribute('data-slate-type') || node.nodeName;
    const elementDeserializers = getElementDeserializers(extensions);

    if (elementDeserializers[type]) {
        let attributes: Attributes | undefined;

        try {
            attributes = elementDeserializers[type](node);
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

export default deserializeHtmlToElement;
