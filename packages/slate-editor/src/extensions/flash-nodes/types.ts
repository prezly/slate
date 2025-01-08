import type { TNode } from '@udecode/plate-common';

export interface FlashEditor {
    flash(from: TNode | undefined, to: TNode | undefined): void;
    nodesToFlash: Array<[top: TNode, bottom: TNode]>;
}
