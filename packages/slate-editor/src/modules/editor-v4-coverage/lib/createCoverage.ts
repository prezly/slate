import type { Coverage } from '@prezly/sdk';
import type { CoverageNode } from '@prezly/slate-types';
import { COVERAGE_NODE_TYPE } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

function createCoverage(id: Coverage['id']): CoverageNode {
    return {
        children: [{ text: '' }],
        coverage: { id },
        type: COVERAGE_NODE_TYPE,
        uuid: uuidV4(),
    };
}

export default createCoverage;
