import { Coverage } from '@prezly/sdk';
import { useSavedSelection } from '@prezly/slate-commons';
import { useState } from 'react';
import { ReactEditor } from 'slate-react';

import { EventsEditor } from '../../../modules/editor-v4-events';

import insertCoverage from './insertCoverage';

interface State {
    isOpen: boolean;
}

interface Actions {
    close: () => void;
    open: () => void;
    rootClose: () => void;
    submit: (coverage: Coverage) => void;
}

const useFloatingCoverageMenu = (editor: ReactEditor): [State, Actions] => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const savedSelection = useSavedSelection();

    const close = () => {
        savedSelection.restore(editor, { focus: true });
        setIsOpen(false);
    };

    const rootClose = () => {
        setIsOpen(false);
    };

    const open = () => {
        EventsEditor.dispatchEvent(editor, 'coverage-dialog-opened');
        setIsOpen(true);
        savedSelection.save(editor);
    };

    const submit = (coverage: Coverage) => {
        EventsEditor.dispatchEvent(editor, 'coverage-dialog-submitted', {
            coverage_id: coverage.id,
        });
        close();
        savedSelection.restore(editor, { focus: true });
        insertCoverage(editor, coverage.id);
    };

    return [{ isOpen }, { close, open, rootClose, submit }];
};

export default useFloatingCoverageMenu;
