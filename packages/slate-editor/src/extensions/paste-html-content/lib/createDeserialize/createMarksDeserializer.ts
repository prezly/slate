import type { DeserializeMarks } from '@prezly/slate-commons';
import type { Descendant } from 'slate';
import { Element, Text } from 'slate';

export type MarksDeserializer = (node: HTMLElement, children: Descendant[]) => Descendant[];

export function createMarksDeserializer(deserialize: DeserializeMarks): MarksDeserializer {
    return function (node, children) {
        const props = deserialize(node) ?? {};

        if (Object.keys(props).length === 0) {
            return children;
        }

        return children.map((child) => applyStylingProps(child, props));
    };
}

/**
 * Recursively apply the given style marks to all descendant Text nodes.
 */
function applyStylingProps<T extends Descendant>(node: T, styles: Record<string, any>): T {
    if (Text.isText(node)) {
        const { text, ...props } = node;
        return { ...props, ...styles, text } as T;
    }

    if (Element.isElement(node)) {
        const { children, ...props } = node;

        return {
            ...props,
            children: children.map((child) => applyStylingProps(child, styles)),
        } as T;
    }

    return node;
}
