import { EditorCommands } from '@prezly/slate-commons';
import type { CalloutNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

import { createCallout } from './createCallout';

export function insertCallout(
    editor: SlateEditor,
    props: Partial<Pick<CalloutNode, 'icon' | 'align' | 'children'>> = {},
) {
    const callout = createCallout(props);

    EditorCommands.insertNodes(editor, [callout], { ensureEmptyParagraphAfter: true });

    return callout;
}
