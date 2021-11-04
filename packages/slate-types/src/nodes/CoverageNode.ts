import { Coverage } from '@prezly/sdk';

import ElementNode, { isElementNode } from './ElementNode';

export const COVERAGE_NODE_TYPE = 'coverage';

export default interface CoverageNode extends ElementNode {
    type: typeof COVERAGE_NODE_TYPE;
    coverage: {
        id: Coverage['id'];
    };
    uuid: string;
}

export const isCoverageNode = (value: any): value is CoverageNode =>
    isElementNode<CoverageNode>(value, COVERAGE_NODE_TYPE);
