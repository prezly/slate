import type { Coverage } from '@prezly/sdk';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';

export const COVERAGE_NODE_TYPE = 'coverage';

export interface CoverageNode extends ElementNode {
    type: typeof COVERAGE_NODE_TYPE;
    coverage: {
        id: Coverage['id'];
    };
    uuid: string;
}

export function isCoverageNode(value: any): value is CoverageNode {
    return isElementNode<CoverageNode>(value, COVERAGE_NODE_TYPE);
}
