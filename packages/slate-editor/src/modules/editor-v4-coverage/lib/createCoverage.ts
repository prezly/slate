import { Coverage } from '@prezly/sdk';
import { COVERAGE_NODE_TYPE, CoverageNode } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

const createCoverage = (id: Coverage['id']): CoverageNode => ({
    children: [{ text: '' }],
    coverage: { id },
    type: COVERAGE_NODE_TYPE,
    uuid: uuidV4(),
});

export default createCoverage;
