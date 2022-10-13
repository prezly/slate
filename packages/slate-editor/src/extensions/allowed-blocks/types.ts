import type { Node, Path } from 'slate';

export interface AllowedBlocksExtensionConfiguration {
    /**
     * @returns {Node|boolean}
     *  - TRUE, keeping the current node
     *  - FALSE, removing the current node
     *  - Node, replacing the current node
     */
    check: (node: Node, path: Path) => boolean | Node;
}
