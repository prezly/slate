import { useMemo, useState } from 'react';
import type { BaseEditor, Editor } from 'slate';
import { ReactEditor } from 'slate-react';

import { saveSelection } from '../commands';

type SavedSelection = ReturnType<typeof saveSelection>;

export function useSavedSelection() {
    const [savedSelection, setSavedSelection] = useState<SavedSelection | null>(null);

    return useMemo(
        () => ({
            restore(editor: ReactEditor & Editor, { focus = false } = {}) {
                if (focus) {
                    ReactEditor.focus(editor);
                }

                if (savedSelection) {
                    savedSelection.restore(editor);
                    setSavedSelection(null);
                }
            },
            save(editor: BaseEditor) {
                return setSavedSelection(saveSelection(editor));
            },
        }),
        [savedSelection],
    );
}
