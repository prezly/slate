import { Element, Node } from 'slate';

import { COVERAGE_TYPE } from '../constants';
import { CoverageElementType } from '../types';

const isCoverage = (coverage: any): coverage is CoverageElementType['coverage'] =>
    typeof coverage === 'object' && coverage !== null && typeof coverage.id === 'number';

const isCoverageElement = (node: Node): node is CoverageElementType =>
    Element.isElement(node) &&
    node.type === COVERAGE_TYPE &&
    isCoverage(node.coverage) &&
    typeof node.uuid === 'string' &&
    node.uuid.length > 0;

export default isCoverageElement;
