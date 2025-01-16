import { EditorCommands } from '@prezly/slate-commons';
import { times } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate';

import type { PlaceholderNode } from '../PlaceholderNode';

import { createPlaceholder } from './createPlaceholder';

export function insertPlaceholders<T extends PlaceholderNode.Type>(
    editor: SlateEditor,
    count: number,
    props: Partial<PlaceholderNode<T>> & Pick<PlaceholderNode<T>, 'type'>,
    ensureEmptyParagraphAfter = false,
): PlaceholderNode<T>[] {
    const placeholders = times(count, () => createPlaceholder<T>(props));

    EditorCommands.insertNodes(editor, placeholders, { ensureEmptyParagraphAfter });

    return placeholders;
}
