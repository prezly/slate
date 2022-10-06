import type { Node, BaseEditor } from 'slate';

export interface FlashEditor extends BaseEditor {
    flash(from: Node | undefined, to: Node | undefined): void;
    nodesToFlash: Array<[top: Node, bottom: Node]>;
}
