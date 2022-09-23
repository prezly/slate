import { times } from 'lodash-es';
import type { Editor } from 'slate';

import type { PlaceholderNode } from '../PlaceholderNode';

import { insertPlaceholder } from './insertPlaceholder';

export function insertPlaceholders<T extends PlaceholderNode.Type>(
    editor: Editor,
    count: number,
    props: Partial<PlaceholderNode<T>> & Pick<PlaceholderNode<T>, 'type'>,
): PlaceholderNode<T>[] {
    return times(count, () => insertPlaceholder<T>(editor, props));
}
