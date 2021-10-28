import { Element } from 'slate';
import { Coverage } from '@prezly/sdk';

export const COVERAGE_NODE_TYPE = 'coverage';

export default interface CoverageNode extends Element {
    type: typeof COVERAGE_NODE_TYPE;
    coverage: {
        id: Coverage['id'];
    };
    uuid: string;
}

export const isCoverageNode = (value: any): value is CoverageNode =>
    Element.isElementType(value, COVERAGE_NODE_TYPE);
