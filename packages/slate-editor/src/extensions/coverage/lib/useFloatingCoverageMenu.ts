import type { CoverageEntry } from '@prezly/sdk';
import { useSavedSelection } from '@prezly/slate-commons';
import { useState } from 'react';
import type { Editor } from 'slate';

import { EventsEditor } from '#modules/events';

import { insertCoverage } from './insertCoverage';

interface State {
    isOpen: boolean;
}

interface Actions {
    close: () => void;
    open: () => void;
    rootClose: () => void;
    submit: (coverage: CoverageEntry) => void;
}

export function useFloatingCoverageMenu(editor: Editor): [State, Actions] {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const savedSelection = useSavedSelection();

    function close() {
        savedSelection.restore(editor, { focus: true });
        setIsOpen(false);
    }

    function rootClose() {
        setIsOpen(false);
    }

    function open() {
        EventsEditor.dispatchEvent(editor, 'coverage-dialog-opened');
        setIsOpen(true);
        savedSelection.save(editor);
    }

    function submit(coverage: CoverageEntry) {
        EventsEditor.dispatchEvent(editor, 'coverage-dialog-submitted', {
            coverage_id: coverage.id,
        });
        close();
        savedSelection.restore(editor, { focus: true });
        insertCoverage(editor, coverage.id);
    }

    return [{ isOpen }, { close, open, rootClose, submit }];
}
