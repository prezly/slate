import { Coverage } from '@prezly/sdk';
import { v4 as uuidV4 } from 'uuid';

import { COVERAGE_TYPE } from '../constants';
import { CoverageElementType } from '../types';

const createCoverage = (id: Coverage['id']): CoverageElementType => ({
    children: [{ text: '' }],
    coverage: { id },
    type: COVERAGE_TYPE,
    uuid: uuidV4(),
});

export default createCoverage;
