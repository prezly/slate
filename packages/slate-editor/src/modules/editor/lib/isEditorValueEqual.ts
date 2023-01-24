import { isEqual } from 'lodash-es';
import type { Editor, Element, Text, Descendant } from 'slate';

import type { Value } from '../types';

export function isEditorValueEqual(editor: Editor, a: Value, b: Value): boolean {
    const compareNodes = cached(editor, (node: Descendant, another: Descendant): boolean => {
        const isNodeText = isText(node);
        const isAnotherText = isText(another);

        if (isNodeText && isAnotherText) {
            return isEqual(node, another); // default lodash `isEqual` logic;
        }

        if (!isNodeText && !isAnotherText) {
            const equal = editor.isElementEqual(node as Element, another as Element);
            if (typeof equal !== 'undefined') {
                return equal && compareLists(node.children, another.children);
            }
            const { children, ...props } = node;
            const { children: otherChildren, ...otherProps } = another;

            return isEqual(props, otherProps) && compareLists(children, otherChildren);
        }

        return false; // comparing Text & Element === always false
    });

    function compareLists(nodes: Descendant[], other: Descendant[]): boolean {
        return (
            nodes.length == other.length && nodes.every((node, i) => compareNodes(node, other[i]))
        );
    }

    return a === b || compareLists(editor.serialize(a), editor.serialize(b));
}

function isText(node: Descendant): node is Text {
    return 'text' in node;
}

// CACHE

const CACHE: WeakMap<Editor, WeakMap<Descendant, WeakMap<Descendant, boolean>>> = new WeakMap();

type WeakMatrix = WeakMap<Editor, WeakMap<Descendant, WeakMap<Descendant, boolean>>>;
type NodesComparator = (node: Descendant, another: Descendant) => boolean;

function cached(editor: Editor, fn: NodesComparator): NodesComparator {
    return (node, another) => {
        const cached = get(CACHE, editor, node, another) ?? get(CACHE, editor, another, node);

        if (typeof cached !== 'undefined') {
            return cached;
        }

        const ret = fn(node, another);

        set(CACHE, editor, node, another, ret);
        set(CACHE, editor, another, node, ret);

        return ret;
    };
}

function get(
    matrix: WeakMatrix,
    editor: Editor,
    node: Descendant,
    another: Descendant,
): boolean | undefined {
    return matrix.get(editor)?.get(node)?.get(another);
}

function set(
    matrix: WeakMatrix,
    editor: Editor,
    node: Descendant,
    another: Descendant,
    value: boolean,
): boolean {
    const level2 = matrix.get(editor) ?? new WeakMap();
    const level3 = level2.get(node) ?? new WeakMap();

    level2.set(node, level3);
    level3.set(another, value);

    return value;
}
