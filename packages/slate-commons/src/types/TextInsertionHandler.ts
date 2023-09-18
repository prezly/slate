/**
 * Hook into ReactEditor's `insertText()` method.
 * Call `next()` to allow other extensions (or the editor) handling the call.
 */
export type TextInsertionHandler = (text: string, next: (text: string) => void) => void;
