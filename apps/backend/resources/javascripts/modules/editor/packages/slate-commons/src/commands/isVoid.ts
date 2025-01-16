import type { Node } from '@udecode/plate';
import { ElementApi, type SlateEditor } from '@udecode/plate';

export function isVoid(editor: SlateEditor, node: Node): boolean {
    return ElementApi.isElement(node) && editor.api.isVoid(node);
}
