/**
 * Hook into HistoryEditors's `undo()` & `redo()` methods.
 * Return `true` to prevent handling this action by other extensions or the editor.
 */
export type HistoryHandler = (next: () => void) => void;
