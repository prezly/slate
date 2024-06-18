import { EditorCommands } from '@prezly/slate-commons';
import type { CalloutNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

import { createCallout } from './createCallout';

export function insertCallout(
    editor: Editor,
    props: Partial<Pick<CalloutNode, 'icon' | 'align' | 'children'>> = {},
) {
    const callout = createCallout(props);

    EditorCommands.insertNodes(editor, [callout], { ensureEmptyParagraphAfter: true });

    return callout;
}
