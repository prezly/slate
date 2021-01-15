import ElementNode, { isElementNode } from './ElementNode';
import { Coverage } from '@prezly/sdk';

export const COVERAGE_NODE_TYPE = 'coverage';

export default interface CoverageNode extends ElementNode {
    coverage: {
        id: Coverage['id'];
    };
    type: typeof COVERAGE_NODE_TYPE;
    uuid: string;
}

export const isCoverageElement = (value: any): value is CoverageNode => {
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
