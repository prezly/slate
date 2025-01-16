import type { Node, SlateEditor } from '@udecode/plate';
import { ElementApi } from '@udecode/plate';

export function isBlock(editor: SlateEditor, node: Node): boolean {
    return ElementApi.isElement(node) && editor.api.isBlock(node);
}
