import { CoverageNode } from '@prezly/slate-types';

import createCoverage from './createCoverage';
import isCoverageElement from './isCoverageElement';

const parseSerializedElement = (serialized: string): CoverageNode | undefined => {
    const parsed = JSON.parse(serialized);

    if (isCoverageElement(parsed)) {
        return createCoverage(parsed.coverage.id);
    }

    return undefined;
};

export default parseSerializedElement;
