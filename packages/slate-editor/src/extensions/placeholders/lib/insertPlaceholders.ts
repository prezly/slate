import { EditorCommands } from '@prezly/slate-commons';
import { times } from 'lodash-es';
import type { Editor } from 'slate';

import type { PlaceholderNode } from '../PlaceholderNode';

import { createPlaceholder } from './createPlaceholder';

export function insertPlaceholders<T extends PlaceholderNode.Type>(
    editor: Editor,
    count: number,
    props: Partial<PlaceholderNode<T>> & Pick<PlaceholderNode<T>, 'type'>,
    ensureEmptyParagraphAfter = false,
): PlaceholderNode<T>[] {
    const placeholders = times(count, () => createPlaceholder<T>(props));

    EditorCommands.insertNodes(editor, placeholders, { ensureEmptyParagraphAfter });

    return placeholders;
}
