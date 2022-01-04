import { useState } from 'react';
import type { BaseEditor, Editor } from 'slate';
import { ReactEditor } from 'slate-react';

import { saveSelection } from '../commands';

type SavedSelection = ReturnType<typeof saveSelection>;

interface Actions {
    restore: (editor: ReactEditor & Editor, options?: { focus?: boolean }) => void;
    save: (editor: Editor) => void;
}

export function useSavedSelection(): Actions {
    const [savedSelection, setSavedSelection] = useState<SavedSelection | null>(null);

    function restore(editor: ReactEditor & Editor, { focus = false } = {}) {
        if (focus) {
            ReactEditor.focus(editor);
        }

        if (savedSelection) {
            savedSelection.restore(editor);
            setSavedSelection(null);
        }
    }

    function save(editor: BaseEditor) {
        return setSavedSelection(saveSelection(editor));
    }

    return { restore, save };
}
