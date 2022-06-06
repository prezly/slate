import type { Element } from 'slate';
import { Node } from 'slate';

import { createEmptyValue } from './createEmptyValue';

export function deserialize(value: string): Element[] {
    if (!value) {
        return createEmptyValue();
    }

    try {
        const parsed = JSON.parse(value);
        if (!Node.isNodeList(parsed.children)) {
            throw new TypeError('editor/deserialize: parse value is not a Node list');
        }
        return parsed.children;
    } catch (error) {
        return createEmptyValue();
    }
}
