import type { Node } from 'slate';

/**
 * Cleanup editor value before reporting it to the outer world.
 * Useful to clean up internal temporary nodes and properties.
 */
export type Serialize = (nodes: Node[]) => Node[];
