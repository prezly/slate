import { isEqual } from 'lodash-es';
import type { Editor, Element, Text, Descendant } from 'slate';

import type { Value } from '../types';

type WeakMatrix = WeakMap<Editor, WeakMap<Descendant, WeakMap<Descendant, boolean>>>;

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

const CACHE: WeakMap<Editor, WeakMap<Descendant, WeakMap<Descendant, boolean>>> = new WeakMap();

export function isEditorValueEqual(editor: Editor, a: Value, b: Value): boolean {
    function compareLists(nodes: Descendant[], other: Descendant[]): boolean {
        return (
            nodes.length == other.length && nodes.every((node, i) => compareNodes(node, other[i]))
        );
    }

    function compareNodes(node: Descendant, another: Descendant): boolean | undefined {
        const cached = get(CACHE, editor, node, another) ?? get(CACHE, editor, another, node);

        if (typeof cached !== 'undefined') {
            return cached;
        }

        const isNodeText = isText(node);
        const isAnotherText = isText(another);

        if (isNodeText && isAnotherText) {
            const ret = isEqual(node, another); // default lodash `isEqual` logic;

            set(CACHE, editor, node, another, ret);
            set(CACHE, editor, another, node, ret);

            return ret;
        }

        if (!isNodeText && !isAnotherText) {
            const equal = editor.isElementEqual(node as Element, another as Element);
            if (typeof equal !== 'undefined') {
                return equal && compareLists(node.children, another.children);
            }
            const { children, ...props } = node;
            const { children: otherChildren, ...otherProps } = another;

            const ret = isEqual(props, otherProps) && compareLists(children, otherChildren);

            set(CACHE, editor, node, another, ret);
            set(CACHE, editor, another, node, ret);

            return ret;
        }

        set(CACHE, editor, node, another, false);
        set(CACHE, editor, another, node, false);

        return false; // comparing Text & Element === always false
    }

    return a === b || compareLists(editor.serialize(a), editor.serialize(b));
}

function isText(node: Descendant): node is Text {
    return 'text' in node;
}
