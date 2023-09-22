/**
 * Hook into ReactEditor's `insertBreak()` method.
 * Return `true` to prevent handling this action by other extensions or the editor.
 */
export type LineBreakHandler = () => void;
