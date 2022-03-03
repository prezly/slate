import { withoutNodes } from '@prezly/slate-commons';
import type { Descendant } from 'slate';

import { isLoaderElement } from '../lib';

export function withoutLoaders<T extends Descendant>(nodes: T[]): T[] {
    return withoutNodes(nodes, isLoaderElement);
}
