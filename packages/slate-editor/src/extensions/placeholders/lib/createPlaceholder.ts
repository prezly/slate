import { v4 as uuid } from 'uuid';

import type { PlaceholderNode } from '../PlaceholderNode';

export function createPlaceholder<T extends PlaceholderNode.Type>(
    props: Partial<PlaceholderNode<T>> & Pick<PlaceholderNode<T>, 'type'>,
): PlaceholderNode<T> {
    return {
        children: [{ text: '' }],
        uuid: uuid(),
        ...props,
    };
}
