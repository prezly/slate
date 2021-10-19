import { COVERAGE_NODE_TYPE, CoverageNode } from '@prezly/slate-types';
import { Element, Node } from 'slate';

const isCoverage = (coverage: any): coverage is CoverageNode['coverage'] =>
    typeof coverage === 'object' && coverage !== null && typeof coverage.id === 'number';

const isCoverageElement = (node: Node): node is CoverageNode =>
    Element.isElement(node) &&
    node.type === COVERAGE_NODE_TYPE &&
    isCoverage(node.coverage) &&
    typeof node.uuid === 'string' &&
    node.uuid.length > 0;

export default isCoverageElement;
