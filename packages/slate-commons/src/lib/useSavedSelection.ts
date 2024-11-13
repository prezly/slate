import type { SlateEditor } from '@udecode/plate-common';
import { focusEditor } from '@udecode/slate-react';
import { useState } from 'react';

import { saveSelection } from '../commands';

type SavedSelection = ReturnType<typeof saveSelection>;

interface Actions {
    restore: (editor: SlateEditor, options?: { focus?: boolean }) => void;
    save: (editor: SlateEditor) => void;
}

export function useSavedSelection(): Actions {
    const [savedSelection, setSavedSelection] = useState<SavedSelection | null>(null);

    function restore(editor: SlateEditor, { focus = false } = {}) {
        if (focus) {
            focusEditor(editor);
        }

        if (savedSelection) {
            savedSelection.restore(editor);
            setSavedSelection(null);
        }
    }

    function save(editor: SlateEditor) {
        return setSavedSelection(saveSelection(editor));
    }

    return { restore, save };
}
