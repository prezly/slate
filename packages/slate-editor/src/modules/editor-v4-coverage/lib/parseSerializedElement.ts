import { CoverageNode, isCoverageNode } from '@prezly/slate-types';

import createCoverage from './createCoverage';

const parseSerializedElement = (serialized: string): CoverageNode | undefined => {
    const parsed = JSON.parse(serialized);

    if (isCoverageNode(parsed)) {
        return createCoverage(parsed.coverage.id);
    }

    return undefined;
};

export default parseSerializedElement;
