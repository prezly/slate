import type { Node, BaseEditor, Editor } from 'slate';

export interface FlashNodesEditor extends BaseEditor {
    flashNodes(from: Node | undefined, to: Node | undefined): void;
    nodesToFlash: Array<[top: Node, bottom: Node]>;
}

export namespace FlashNodesEditor {
    export function isFlashEditor<T extends Editor>(editor: T): editor is T & FlashNodesEditor {
        const candidate = editor as T & Partial<FlashNodesEditor>;
        return typeof candidate.flashNodes === 'function' && Array.isArray(candidate.nodesToFlash);
    }
}
