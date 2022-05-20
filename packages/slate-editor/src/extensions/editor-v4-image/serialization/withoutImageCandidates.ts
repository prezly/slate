import { withoutNodes } from '@prezly/slate-commons';
import type { Descendant } from 'slate';

import { isImageCandidateElement } from '../lib';

export function withoutImageCandidates<T extends Descendant>(nodes: T[]): T[] {
    return withoutNodes(nodes, isImageCandidateElement);
}
