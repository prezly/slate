import { useState } from 'react';
import { ReactEditor } from 'slate-react';

import { saveSelection } from '../commands';

type SavedSelection = ReturnType<typeof saveSelection>;

interface Actions {
    restore: (editor: ReactEditor, options?: { focus?: boolean }) => void;
    save: (editor: ReactEditor) => void;
}

const useSavedSelection = (): Actions => {
    const [savedSelection, setSavedSelection] = useState<SavedSelection | null>(null);

    const restore = (editor: ReactEditor, { focus = false } = {}) => {
        if (focus) {
            ReactEditor.focus(editor);
        }

        if (savedSelection) {
            savedSelection.restore(editor);
            setSavedSelection(null);
        }
    };

    const save = (editor: ReactEditor) => {
        setSavedSelection(saveSelection(editor));
    };

    return { restore, save };
};

export default useSavedSelection;
