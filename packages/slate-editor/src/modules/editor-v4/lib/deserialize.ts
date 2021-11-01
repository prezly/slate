import { createEmptyValue } from '@prezly/slate-commons';
import { Element, Node } from 'slate';

const deserialize = (value: string): Element[] => {
    if (!value) {
        return createEmptyValue();
    }

    try {
        const parsed = JSON.parse(value);
        if (!Node.isNodeList(parsed.children)) {
            throw new TypeError('editor-v4/deserialize: parsed value is not a Node list');
        }
        return parsed.children;
    } catch (error) {
        return createEmptyValue();
    }
};

export default deserialize;
