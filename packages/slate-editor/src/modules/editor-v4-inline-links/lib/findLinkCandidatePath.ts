import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Path } from 'slate';

import { isLinkCandidateNode } from './isLinkCandidateNode';

export function findLinkCandidatePath(editor: Editor, id: string): Path | null {
    const [nodeEntry] = EditorCommands.findDescendants(
        editor,
        (element) => isLinkCandidateNode(element) && element.id === id,
    );

    return nodeEntry ? nodeEntry[1] : null;
}
