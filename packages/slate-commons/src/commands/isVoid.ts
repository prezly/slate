import { Editor } from 'slate';
import type { Node } from 'slate';

/**
 * This is a dumb proxy for `Editor.isVoid()` function.
 * The problem with the original function is that it is declared as a type-guard:
 *
 *    isVoid: (editor: Editor, value: any) => value is Element
 *
 * This has a logical problem with TS type system. As checking a node for `isVoid`
 * excludes the other branch of the condition, where the node is a non-void element.
 *
 *    if (Text.isText(editor, node)) {
 *        // Do something when node is TEXT.
 *        return;
 *    }
 *
 *    if (Editor.isVoid(editor, node)) {
 *        // Do something when node is VOID ELEMENT.
 *        return;
 *    }
 *
 *    // Do something when node is NON-VOID ELEMENT.
 *    // But TS thinks that node is `never`, as the `is Element`
 *    // branch is already excluded above.
 *
 *
 * @param editor
 * @param node
 */
export function isVoid(editor: Editor, node: Node): boolean {
    return Editor.isVoid(editor, node);
}
