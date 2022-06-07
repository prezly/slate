import type { DeserializeMarks } from '@prezly/slate-commons';
import type { Descendant } from 'slate';
import { Element } from 'slate';
import { createText } from 'slate-hyperscript';

type DeserializeHTMLChildren = ChildNode | Descendant | string | null;

export type MarksDeserializer = (
    node: HTMLElement,
    children: DeserializeHTMLChildren[],
) => Descendant[] | null;

export function createMarksDeserializer(deserializers: DeserializeMarks): MarksDeserializer {
    return function (node, children) {
        const type = node.getAttribute('data-slate-type') || node.nodeName;

        if (deserializers[type]) {
            const props = deserializers[type](node) || {};

            return children.reduce<Descendant[]>((array, child) => {
                if (!child) {
                    return array;
                }

                if (Element.isElement(child)) {
                    array.push(child);
                } else {
                    array.push(createText('text', props, [child]));
                }

                return array;
            }, []);
        }

        return null;
    };
}
