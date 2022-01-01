import type { Extension } from '@prezly/slate-commons';
import { jsx } from '@prezly/slate-hyperscript';
import type { Descendant } from 'slate';
import { Element } from 'slate';

import getLeafDeserializers from './getLeafDeserializers';

type DeserializeHTMLChildren = ChildNode | Descendant | string | null;

function deserializeHtmlToMarks(extensions: Extension[]) {
    return function (node: HTMLElement, children: DeserializeHTMLChildren[]): Descendant[] | null {
        const type = node.getAttribute('data-slate-type') || node.nodeName;
        const deserializers = getLeafDeserializers(extensions);

        if (deserializers[type]) {
            const props = deserializers[type].reduce((result, tag) => {
                const attributes = tag(node);
                if (attributes) {
                    return { ...result, ...attributes };
                }

                return result;
            }, {});

            return children.reduce<Descendant[]>((array, child) => {
                if (!child) {
                    return array;
                }

                if (Element.isElement(child)) {
                    array.push(child);
                } else {
                    array.push(jsx('text', props, child));
                }

                return array;
            }, []);
        }

        return null;
    };
}

export default deserializeHtmlToMarks;
