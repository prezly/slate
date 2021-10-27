import { PlaceholderKey } from '../sdk';

import ElementNode, { isElementNode } from './ElementNode';
import TextNode from './TextNode';

export const PLACEHOLDER_NODE_TYPE = 'placeholder';

export default interface PlaceholderNode<Key extends string = PlaceholderKey>
    extends ElementNode<typeof PLACEHOLDER_NODE_TYPE> {
    children: TextNode[];
    key: Key;
}

export const isPlaceholderNode = <Key extends string>(
    value: any,
): value is PlaceholderNode<Key> => {
    return (
        isElementNode(value) &&
        value.type === PLACEHOLDER_NODE_TYPE &&
        typeof value.key === 'string'
    );
};
