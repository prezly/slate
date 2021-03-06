/* eslint-disable no-param-reassign */
import { HistoryEditor } from 'slate-history';

import { getLoaders, loaderPromiseManager } from './lib';
import { LoaderElementType } from './types';

/*
 * Only loaders that have unresolved promises scheduled to dispose of them are allowed
 * in the editor. Other nodes will never be automatically replaced so it's our job to
 * prevent them from re-appearing in the editor.
 */
const isLoaderAllowed = ({ id }: LoaderElementType): boolean => loaderPromiseManager.isPending(id);

const createHistoryHandler = <T extends HistoryEditor>(
    editor: T,
    {
        canPerform,
        command,
        revertCommand,
    }: {
        canPerform: () => boolean;
        command: () => void;
        revertCommand: () => void;
    },
) => () => {
    if (!canPerform()) {
        return;
    }

    command();

    let commandsCount = 1;
    let loaders = getLoaders(editor);
    let disallowedLoaders = loaders.filter(([loaderNode]) => !isLoaderAllowed(loaderNode));

    while (canPerform() && disallowedLoaders.length > 0) {
        command();
        ++commandsCount;

        loaders = getLoaders(editor);
        disallowedLoaders = loaders.filter(([loaderNode]) => !isLoaderAllowed(loaderNode));
    }

    // If we can no longer perform the command but there still are some disallowed nodes
    // in the editor we have to revert all our changes (effectively making the whole routine a no-op).
    // Otherwise, we'd leave the editor in an invalid state (with disallowed nodes).
    if (disallowedLoaders.length > 0) {
        while (commandsCount > 0) {
            revertCommand();
            --commandsCount;
        }
    }
};

const withLoaders = <T extends HistoryEditor>(editor: T): T => {
    const { redo, undo } = editor;

    editor.redo = createHistoryHandler(editor, {
        canPerform: () => editor.history.redos.length > 0,
        command: redo,
        revertCommand: undo,
    });

    editor.undo = createHistoryHandler(editor, {
        canPerform: () => editor.history.undos.length > 0,
        command: undo,
        revertCommand: redo,
    });

    return editor;
};

export default withLoaders;
