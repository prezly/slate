import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Path } from 'slate';

import isLinkCandidateElement from './isLinkCandidateElement';

const findLinkCandidatePath = (editor: Editor, id: string): Path | null => {
    const [nodeEntry] = EditorCommands.findDescendants(
        editor,
        (element) => isLinkCandidateElement(element) && element.id === id,
    );

    return nodeEntry ? nodeEntry[1] : null;
};

export default findLinkCandidatePath;
