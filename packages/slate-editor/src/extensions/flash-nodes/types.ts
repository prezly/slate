import type { Node } from 'slate';

export interface FlashEditor {
    flash(from: Node | undefined, to: Node | undefined): void;
    nodesToFlash: Array<[top: Node, bottom: Node]>;
}
