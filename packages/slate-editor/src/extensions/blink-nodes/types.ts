import type { Node } from 'slate';

export interface BlinkEditor {
    blink(from: Node | undefined, to: Node | undefined): void;
    nodesToBlink: Array<[top: Node, bottom: Node]>;
}
