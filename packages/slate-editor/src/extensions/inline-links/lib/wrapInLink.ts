import type { LinkNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import type { Path, Range } from 'slate';

import { createLink } from './createLink';

export function wrapInLink(
    editor: SlateEditor,
    props: Pick<LinkNode, 'href' | 'new_tab'>,
    selection?: Path | Range,
): void {
    editor.wrapNodes(createLink({ ...props, children: [] }), {
        at: selection,
        split: true,
    });
}
