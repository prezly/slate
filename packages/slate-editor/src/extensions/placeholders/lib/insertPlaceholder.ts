import { EditorCommands } from '@prezly/slate-commons';
import type { Editor } from 'slate';

import type { PlaceholderNode } from '../PlaceholderNode';

import { createPlaceholder } from './createPlaceholder';

export function insertPlaceholder<T extends PlaceholderNode.Type>(
    editor: Editor,
    props: Partial<PlaceholderNode<T>> & Pick<PlaceholderNode<T>, 'type'>,
): PlaceholderNode<T> {
    const placeholder = createPlaceholder<T>(props);

    EditorCommands.insertNodes(editor, [placeholder]);

    return placeholder;
}
