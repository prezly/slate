import { withoutNodes } from '@prezly/slate-commons';
import type { Descendant } from 'slate';

import { isLinkCandidateNode } from '../lib';

export function withoutLinkCandidates<T extends Descendant>(nodes: T[]): T[] {
    return withoutNodes(nodes, isLinkCandidateNode);
}
