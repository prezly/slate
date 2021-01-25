import { Coverage } from '@prezly/sdk';

import ElementNode, { isElementNode } from './ElementNode';

export const COVERAGE_NODE_TYPE = 'coverage';

export default interface CoverageNode extends ElementNode<typeof COVERAGE_NODE_TYPE> {
    coverage: {
        id: Coverage['id'];
    };
    uuid: string;
}

export const isCoverageNode = (value: any): value is CoverageNode => {
    return (
        isElementNode(value) &&
        value.type === COVERAGE_NODE_TYPE &&
        isCoverage(value.coverage) &&
        typeof value.uuid === 'string' &&
        value.uuid.length > 0
    );
};

const isCoverage = (value: any): value is CoverageNode['coverage'] => {
    return typeof value === 'object' && value !== null && typeof value.id === 'number';
};
