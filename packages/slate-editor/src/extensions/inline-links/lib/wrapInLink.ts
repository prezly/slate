import type { LinkNode } from '@prezly/slate-types';
import type { Path, Range, SlateEditor } from '@udecode/plate';

import { createLink } from './createLink';

export function wrapInLink(
    editor: SlateEditor,
    props: Pick<LinkNode, 'href' | 'new_tab'>,
    selection?: Path | Range,
): void {
    editor.tf.wrapNodes(createLink({ ...props, children: [] }), {
        at: selection,
        split: true,
    });
}
